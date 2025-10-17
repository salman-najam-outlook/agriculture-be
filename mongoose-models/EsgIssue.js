const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const logUserActivityPlugin = require('../plugins/activity-log');

const ESG_ISSUE_TYPE = ['Environmental', 'Social', 'Governance'];

const EsgIssueSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ESG_ISSUE_TYPE,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    noOfQuestions: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0 && Number.isInteger(value);
        },
      },
    },

    noOfGoals: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0 && Number.isInteger(value);
        },
      },
    },

    createdByUser: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    createdByCfUserId: {
      type: Number,
      required: true,
    },

    organization: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: 'Organization',
    },

    cfOrganizationId: {
      type: Number,
      default: null,
    },

    esgProtocol: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'EsgProtocol',
    },

    order: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
      },
    },

    originalEsgIssue: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: 'EsgIssue',
    },
  },
  {
    timestamps: true,
    collection: 'esgIssues',
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

EsgIssueSchema.virtual('esgGoals', {
  ref: 'EsgGoal',
  localField: '_id',
  foreignField: 'esgIssue',
  match: { deleted: { $ne: false } },
});

EsgIssueSchema.plugin(logUserActivityPlugin, {
  taggedRelations: ['esgProtocol'],
  excludeKeys: ['updatedAt'],
  deleteKey: 'deletedAt',
});

EsgIssueSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: true,
});

const EsgIssue = mongoose.model('EsgIssue', EsgIssueSchema);

module.exports = {
  ESG_ISSUE_TYPE,
  EsgIssue,
};
