const moment = require('moment');
const { UserActivityLog, UserActivityTag } = require('../../mongoose-models/UserActivityLog');
const Queue = require('bull');
const jsonDiff = require('json-diff');

const UserActivityLogQueue = new Queue('UserActivityLogQueue', {
  redis: {
    maxRetriesPerRequest: null,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 3,
  },
});

UserActivityLogQueue.process(async (job, done) => {
  let { action, modelName, modelId, previousData, newData, tags = [], user, excludeKeys, clientMetadata } = job.data;
  try {
    tags = tags.filter(Boolean);

    const activityTags = await createUserActivityTags(tags);
    const tagIds = activityTags.map((tag) => tag._id);
    const log = {
      action,
      user,
      tags: tagIds,
      taggedDocs: activityTags,
      doc: modelId,
      docModel: modelName,
      changes:
        action.toLowerCase() === 'created' || action.toLowerCase() === 'deleted'
          ? newData
          : updateDiffKeys(
              jsonDiff.diff(previousData, newData, {
                excludeKeys: excludeKeys || [],
              })
            ),
      createdAt: moment.utc().toDate(),
      clientMetadata,
    };
    if (action.toLowerCase() === 'updated' && !log.changes) {
      done(null, 'No activity to log');
      job.progress(100);
    } else {
      await UserActivityLog.create(log);
      done(null, 'User activity logged successfully');
      job.progress(100);
    }
  } catch (error) {
    console.error('FAILED to log user activity', error, {
      action,
      modelName,
      modelId,
      previousData,
      newData,
      tags,
      user,
      excludeKeys,
      clientMetadata,
    });
    done(error);
    job.progress(100);
  }
});

const updateDiffKeys = (changes) => {
  if (!changes) return changes;

  if (Array.isArray(changes)) {
    changes.forEach((change, index) => {
      if (Array.isArray(change)) {
        const [action, value] = change;
        if (action === ' ') {
          changes[index] = null;
        } else if (action === '+') {
          changes[index] = { new: value, old: null };
        } else if (action === '-') {
          changes[index] = { old: value, new: null };
        } else if (action === '~') {
          changes[index] = updateDiffKeys(value);
        }
      }
    });

    changes = changes.filter((change) => change !== null);
    return changes;
  }

  Object.keys(changes).map((key) => {
    if (key.endsWith('__added')) {
      changes[key.replace('__added', '')] = { new: changes[key] };
      delete changes[key];
    } else if (key.endsWith('__old')) {
      changes[key.replace('__old', 'old')] = changes[key];
      delete changes[key];
    } else if (key.endsWith('__new')) {
      changes[key.replace('__new', 'new')] = changes[key];
      delete changes[key];
    } else if (key.endsWith('__deleted')) {
      changes[key.replace('__deleted', '')] = { old: changes[key] };
      delete changes[key];
    } else if (typeof changes[key] === 'object') {
      changes[key] = updateDiffKeys(changes[key]);
    }
  });
  return changes;
};

const createUserActivityTags = async (tags) => {
  try {
    const arrayTags = Array.isArray(tags) ? tags : [tags];
    const createdTags = await Promise.all(
      arrayTags.map((tag) => {
        return UserActivityTag.findOneAndUpdate(
          { taggedDoc: tag.taggedDoc, taggedModel: tag.taggedModel },
          { taggedDoc: tag.taggedDoc, taggedModel: tag.taggedModel },
          { upsert: true, new: true }
        );
      })
    );
    return createdTags;
  } catch (error) {
    console.log('Failed to create tags', error);
  }
};

/**
 * Logs user activity by creating an entry in the UserActivityLog collection.
 *
 * @function
 * @param {Object} params - The parameters for logging user activity.
 * @param {string} params.action - The action performed by the user (e.g., 'created', 'updated', 'deleted').
 * @param {string} params.modelName - The name of the model associated with the activity.
 * @param {string} params.modelId - The ID of the document associated with the activity.
 * @param {Object} [params.previousData] - The previous state of the document (used for 'updated' actions).
 * @param {Object} [params.newData] - The new state of the document (used for 'created' or 'updated' actions).
 * @param {Object|Object[]} params.tags - Tags associated with the activity (can be a single tag or an array of tags).
 * @param {string} params.tags.taggedDoc - The ID of document tagged with the activity.
 * @param {string} params.tags.taggedModel - The name of the model tagged with the activity.
 * @param {Object} params.user - The user performing the action.
 * @param {string} params.user.mongoId - The mongo ID of the user performing the action.
 * @param {string} params.user.id - The ID of the user performing the action.
 *
 * @returns {Promise<void>}
 */
exports.logUserActivity = async ({
  action,
  modelName,
  modelId,
  previousData,
  newData,
  tags,
  user,
  excludeKeys,
  clientMetadata,
}) => {
  await UserActivityLogQueue.add({
    action,
    modelName,
    modelId,
    previousData,
    newData,
    tags,
    user,
    excludeKeys,
    clientMetadata,
  });
};

const getUserActivityLogQueryFilter = ({ taggedModel, taggedDocId, docModel, docId, userId, action }) => {
  const filter = {};

  if (action) filter.action = action;

  if (userId) filter.userId = userId;

  if (docModel) filter.docModel = docModel;

  if (docId) filter.doc = docId;

  if (taggedModel || taggedDocId) {
    filter.taggedDocs = {
      $elemMatch: {},
    };
    if (taggedModel) filter.taggedDocs.$elemMatch.taggedModel = taggedModel;
    if (taggedDocId) filter.taggedDocs.$elemMatch.taggedDoc = taggedDocId;
  }

  return filter;
};

exports.getUserActivityLogs = async (queryParams) => {
  const page = (queryParams.page ? parseInt(queryParams.page) : 1) || 1;
  const limit = (queryParams.limit ? parseInt(queryParams.limit) : 10) || 10;
  const filter = getUserActivityLogQueryFilter(queryParams);
  const skip = (page - 1) * limit;
  const [rows, total] = await Promise.all([
    UserActivityLog.find(filter)
      .select({
        taggedDocs: 0,
      })
      .sort({
        createdAt: 'desc',
      })
      .skip(skip)
      .limit(limit)
      .populate('user', 'firstName lastName fullName')
      .populate({
        path: 'doc',
        select: 'title',
        options: { withDeleted: true },
      })
      .populate({
        path: 'tags',
        populate: {
          path: 'taggedDoc',
          select: 'title',
          options: { withDeleted: true },
        },
      })
      .exec(),
    UserActivityLog.countDocuments(filter).exec(),
  ]);
  return {
    rows,
    totalItems: total,
    totalPage: Math.ceil(total / limit),
    currentPage: page,
    limit,
  };
};
