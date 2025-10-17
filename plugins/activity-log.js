const { Model } = require('mongoose');
const { logUserActivity } = require('../services/logs/user-activity-log');
const { Schema } = require('mongoose');
const { v4 } = require('uuid');

const parseTaggedRelation = (relation, schema, modelName) => {
  if (!relation) return;

  if (typeof relation === 'string') {
    if (relation === '_id') {
      return {
        path: '_id',
        ref: modelName,
        whenChanged: false,
      };
    }
    const relationSchema = schema.path(relation);
    if (!relationSchema || typeof relationSchema.options?.ref !== 'string') return;
    return {
      path: relation,
      ref: relationSchema.options.ref,
      whenChanged: false,
    };
  }

  if (typeof relation === 'object') {
    const { path, through, whenChanged } = relation;
    if (!path) return;
    const relationSchema = schema.path(path);
    return {
      path,
      ref: relationSchema && typeof relationSchema?.options?.ref === 'string' ? relationSchema.options.ref : null,
      whenChanged: !!whenChanged,
      through,
    };
  }
};

const logChangesOnDocument = async (doc, options, inferredAction, _oldObject) => {
  try {
    const action =
      inferredAction || (doc.isNew ? 'created' : options.deleteKey && doc[options.deleteKey] ? 'deleted' : 'updated');
    const oldObject = action !== 'deleted' ? _oldObject || (await doc.constructor.findOne({ _id: doc._id })) : null;

    const taggedRelations = options.taggedRelations || [];
    const tags = [];
    for (const relation of taggedRelations) {
      const parsedRelation = parseTaggedRelation(relation, doc.schema, options.modelName);
      if (!parsedRelation) continue;
      const { path, ref, whenChanged, through } = parsedRelation;

      if (!through) {
        const previousValue = oldObject
          ? oldObject[path] instanceof Model
            ? oldObject[path]._id.toString()
            : oldObject[path]?.toString()
          : null;
        const value = doc[path] instanceof Model ? doc[path]._id.toString() : doc[path]?.toString();
        if (whenChanged && previousValue === value) continue;

        Array.from(new Set([previousValue, value])).forEach((val) => {
          if (val) {
            tags.push({
              taggedDoc: val,
              taggedModel: ref,
            });
          }
        });
      } else {
        const objects = await through.model
          .find({ [through.localKey]: doc[through.foreignKey] })
          .select(path)
          .exec();
        const values = Array.from(new Set(objects.map((object) => object[path]?.toString())));
        values.forEach((val) => {
          if (val) {
            tags.push({
              taggedDoc: val,
              taggedModel: through.taggedModelName,
            });
          }
        });
      }
    }

    logUserActivity({
      action,
      modelName: doc.constructor.modelName,
      modelId: doc._id,
      previousData: oldObject?.toObject(),
      newData: doc.toObject(),
      tags,
      user: action === 'created' ? doc.createdByUser : doc.lastModifiedByUser,
      excludeKeys: [
        ...(options.excludeKeys || []),
        'lastModifiedByUser',
        '_clientMetadata',
        'createdByUser',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'deleted',
      ],
      clientMetadata: doc._clientMetadata,
    });
  } catch (error) {
    console.error('FAILED to LOG CHANGES on DOCUMENT', error, doc.toObject());
  }
};

const queryStorage = new Map();

const storeOldDataInMemoryForUpdate = async (query) => {
  try {
    const model = query.model;
    const filterOptions = query._conditions;

    const docs = await model.find(filterOptions);
    query.queryStorageId = v4();
    queryStorage.set(query.queryStorageId, docs);
  } catch (error) {
    console.error('FAILED to STORE OLD DATA in MEMORY', error, query);
  }
};

const logChangesByQueryForUpdate = async (query, options) => {
  try {
    const queryStorageId = query.queryStorageId;
    const oldDocs = queryStorage.get(queryStorageId);
    const model = query.model;
    const filterOptions = query._conditions;
    const newDocs = await model.find(filterOptions);

    for (const newDoc of newDocs) {
      const oldDoc = oldDocs.find((doc) => doc._id.toString() === newDoc._id.toString());
      await logChangesOnDocument(newDoc, options, 'updated', oldDoc);
    }
    queryStorage.delete(queryStorageId);
  } catch (error) {
    console.error('FAILED to LOG CHANGES on QUERY', error, query);
  }
};

const logChangesByQueryFoDelete = async (query, options) => {
  try {
    const model = query.model;
    const filterOptions = query._conditions;
    const docs = await model.find(filterOptions);
    for (const doc of docs) {
      await logChangesOnDocument(doc, options, 'deleted');
    }
  } catch (error) {
    console.error('FAILED to LOG CHANGES on QUERY', error, query);
  }
};

function logUserActivityPlugin(schema, options = {}) {
  if (!schema.path('lastModifiedByUser')) {
    schema.add({
      lastModifiedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    });
  }

  if (!schema.path('_clientMetadata')) {
    schema.add({
      _clientMetadata: {
        type: Schema.Types.Map,
        of: Schema.Types.Mixed,
        default: null,
      },
    });
  }

  if (!schema.path('createdByUser')) {
    schema.add({
      createdByUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    });
  }

  schema.pre('save', async function (next) {
    await logChangesOnDocument(this, options);
    next();
  });

  schema.pre('updateOne', { document: true, query: false }, async function (next) {
    await logChangesOnDocument(this, options);
    next();
  });

  schema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await logChangesOnDocument(this, options, 'deleted');
    next();
  });

  schema.pre('updateMany', { document: false, query: true }, async function (next) {
    await storeOldDataInMemoryForUpdate(this);
    next();
  });

  schema.post('updateMany', { document: false, query: true }, async function () {
    await logChangesByQueryForUpdate(this, options);
  });

  schema.pre('findOneAndUpdate', async function (next) {
    await storeOldDataInMemoryForUpdate(this);
    next();
  });

  schema.post('findOneAndUpdate', async function () {
    await logChangesByQueryForUpdate(this, options);
  });

  schema.pre('findOneAndDelete', async function (next) {
    await logChangesByQueryFoDelete(this);
    next();
  });

  schema.pre('deleteMany', async function (next) {
    await logChangesByQueryFoDelete(this);
    next();
  });
}

module.exports = logUserActivityPlugin;
