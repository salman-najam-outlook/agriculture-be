const mongoose = require('mongoose');
const { ESG_ISSUE_TYPE } = require('./EsgIssue');
const mongoose_delete = require('mongoose-delete');
const logUserActivityPlugin = require('../plugins/activity-log');

const EsgGoalSchema = new mongoose.Schema(
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

    targetYears: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
      },
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

    order: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
      },
    },

    esgProtocol: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'EsgProtocol',
    },

    esgIssue: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'EsgIssue',
    },

    esgAssessment: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'esgAssessment',
    },

    originalEsgGoal: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: 'EsgGoal',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'esgGoals',
  }
);

EsgGoalSchema.plugin(logUserActivityPlugin, {
  taggedRelations: [
    'esgProtocol',
    {
      path: 'esgAssessment',
      whenChanged: true,
    },
  ],
  excludeKeys: ['noOfQuestions'],
  deleteKey: 'deletedAt',
});

EsgGoalSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: true,
});

const EsgGoal = mongoose.model('EsgGoal', EsgGoalSchema);

module.exports = {
  EsgGoal,
};
