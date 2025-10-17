const mongoose = require('mongoose');

const UserActivityTagSchema = new mongoose.Schema(
  {
    taggedDoc: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'taggedModel',
    },
    taggedModel: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return mongoose.modelNames().includes(value);
        },
      },
    },
  },
  {
    collection: 'userActivityTags',
  }
);

const UserActivityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: 'User',
    },

    doc: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'docModel',
    },

    docModel: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return mongoose.modelNames().includes(value);
        },
      },
    },

    changes: {
      type: mongoose.Schema.Types.Map,
      of: mongoose.Schema.Types.Mixed,
      required: false,
    },

    tags: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserActivityTag' }],
      default: [],
    },

    taggedDocs: {
      type: [UserActivityTagSchema],
      default: [],
    },

    clientMetadata: {
      type: mongoose.Schema.Types.Map,
      of: mongoose.Schema.Types.Mixed,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    collection: 'userActivityLogs',
  }
);

const UserActivityTag = mongoose.model('UserActivityTag', UserActivityTagSchema);
const UserActivityLog = mongoose.model('UserActivityLog', UserActivityLogSchema);
module.exports = {
  UserActivityLog,
  UserActivityTag,
};
