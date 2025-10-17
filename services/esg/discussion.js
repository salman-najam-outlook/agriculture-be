const Attachment = require('../../mongoose-models/Attachment');
const Discussion = require('../../mongoose-models/Discussion');
const User = require('../../mongoose-models/User');

const createDiscussion = async (data, user) => {
  const discussion = new Discussion({
    content: data.content,
    createdByUser: user.mongoId,
    createdByCfUserId: user.id,
    organizationId: user.mongoOrganizationId,
    cfOrganizationId: user.organization,
    parentId: data?.parentId || null,
    protocolId: data?.protocolId,
    hasAttachments: data.hasAttachments || false
  });

   await discussion.save();

  if(data?.hasAttachments && Array.isArray(data?.files) && data.files.length > 0){
    await Attachment.create(data.files.map(file => ({
      s3Key: file.s3Key,
      fileUrl: file.fileUrl,
      createdByUser: user?.mongoId,
      createdByCfUserId: user?.id,
      protocolId: data?.protocolId,
      discussionId: discussion._id
    })));
  }

  return Discussion.findById(discussion._id)
    .populate('createdByUser', 'firstName lastName')
    .populate('assignedToUser', 'firstName lastName')
    .populate('attachments')
    .exec();
};

const listDiscussions = async (protocolId, organizationId, page = 1, limit = 10) => {
  const discussions = await Discussion.find({
    protocolId,
    organizationId,
    parentId: null,
    isDeleted: false
  })
    .populate('createdByUser', 'firstName lastName')
    .populate('assignedToUser', 'firstName lastName')
    .populate({
      path: 'replies',
      match: { isDeleted: false },
      populate: [
        { path: 'createdByUser', select: 'firstName lastName' },
        { path: 'assignedToUser', select: 'firstName lastName' },
        { path: 'attachments', match: { isDeleted: false } }
      ]
    })
    .populate({
      path: 'attachments',
      match: { isDeleted: false }
    })
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await Discussion.countDocuments({
    protocolId,
    organizationId,
    parentId: null,
    isDeleted: false
  });

  return {
    discussions: transformDiscussions(discussions),
    pagination: {
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getAttachments = async (protocolId, page = 1, limit = 10) => {
  const discussions = await Discussion.find({
    protocolId,
    hasAttachments: true,
    isDeleted: false
  }).distinct('_id');
  const discussionIds = discussions.map(discussion => discussion._id);

  const attachments = await Attachment.find({
    discussionId: { $in: discussionIds },
    isDeleted: false
  })
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  const total = await Attachment.countDocuments({
    discussionId: { $in: discussionIds },
    isDeleted: false
  });

  return {
    attachments,
    pagination: {
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    }
  };
};

const assignUser = async (discussionId, assignedUserId, organizationId) => {
  const discussion = await Discussion.findOne({
    _id: discussionId,
    organizationId
  });

  if (!discussion) {
    throw new Error('Discussion not found');
  }

  const assignedUser = await User.findOne({
    _id: assignedUserId,
    organizationId,
    active: true,
    role: 'admin'
  });

  console.log("assignedUser",assignedUser,'assignedUserId',assignedUserId,'organizationId',organizationId,'discussion',discussion);

  if (!assignedUser) {
    throw new Error('User not authorized to be assigned');
  }

  discussion.assignedToUser = assignedUserId;
  discussion.assignedToCfUserId = assignedUser.id;
  await discussion.save();

  return Discussion.findById(discussionId)
    .populate('createdByUser', 'firstName lastName')
    .populate('assignedToUser', 'firstName lastName')
    .populate('attachments')
    .lean();
};

const getAvailableUsers = async (organizationId) => {
  const users = await User.find({
    organizationId,
    active: 1,
    role: 'admin'
  });

  return users.map(user => ({
    _id: user._id,
    name: `${user.firstName} ${user.lastName}`
  }));
};

// Helper function to transform discussions
const transformDiscussions = (discussions) => {
  return discussions.map(discussion => ({
    ...discussion,
    user: discussion.createdByUser,
    content: discussion.content,
    replies: discussion.replies?.map(reply => ({
      ...reply,
      user: reply.createdByUser,
      content: reply.content,
      assignedToUser: reply.assignedToUser
    }))
  }));
};

module.exports = {
  createDiscussion,
  listDiscussions,
  getAttachments,
  assignUser,
  getAvailableUsers
};