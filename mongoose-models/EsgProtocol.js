const moment = require('moment');
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const logUserActivityPlugin = require('../plugins/activity-log');

const ESG_PROTOCOL_TYPE = ['Standard', 'Protocol'];
const ESG_APPROVAL_METHOD = ['Auto', 'Manual'];

const EsgProtocolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: false,
    },
    
    shortCode: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: false,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    sealKey: {
      type: String,
      required: true,
    },

    sealUrl: {
      type: String,
      required: true,
    },

    noOfIssues: {
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

    type: {
      type: String,
      enum: ESG_PROTOCOL_TYPE,
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

    esgStandard: {
      type: mongoose.Types.ObjectId,
      ref: 'EsgProtocol',
      default: null,
    },

    requiresMandatoryScoreForGovernanceScore: {
      type: Boolean,
      default: false,
    },

    requiresMandatoryScoreForSocialScore: {
      type: Boolean,
      default: false,
    },

    requiresMandatoryScoreForEnvironmentalScore: {
      type: Boolean,
      default: false,
    },

    environmentalScore: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          if (value === null) return true;
          return value >= 0 && value <= 100;
        },
      },
    },

    socialScore: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          if (value === null) return true;
          return value >= 0 && value <= 100;
        },
      },
    },

    governanceScore: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          if (value === null) return true;
          return value >= 0 && value <= 100;
        },
      },
    },

    overallScore: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          if (value === null) return true;
          return value >= 0 && value <= 100;
        },
      },
    },

    approvalMethod: {
      type: String,
      enum: ESG_APPROVAL_METHOD,
      default: 'Auto',
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    environmentalGoalProgress: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
      },
    },

    socialGoalProgress: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
      },
    },

    governanceGoalProgress: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
      },
    },

    esrsProgress: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
      },
    },

    deadlineDate: {
      type: Date,
      required: false,
      default: null,
    },

    startDate: {
      type: Date,
      required: false,
      default: null,
    },
    subOrganizations: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'esgProtocols',
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    virtuals: {
      deadlineYear: {
        get: function () {
          return this.deadlineDate ? moment.utc(this.deadlineDate).year() : null;
        },
      },
      startYear: {
        get: function () {
          return this.startDate ? moment.utc(this.startDate).year() : null;
        }
      }
    }
  }
);

EsgProtocolSchema.virtual('esgIssues', {
  ref: 'EsgIssue',
  localField: '_id',
  foreignField: 'esgProtocol',
  match: { deleted: { $ne: false } },
});

EsgProtocolSchema.virtual('esgGoals', {
  ref: 'EsgGoal',
  localField: '_id',
  foreignField: 'esgProtocol',
  match: { deleted: { $ne: false } },
});

EsgProtocolSchema.plugin(logUserActivityPlugin, {
  taggedRelations: ['_id'],
  excludeKeys: ['updatedAt'],
  deleteKey: 'deletedAt',
  modelName: 'EsgProtocol',
});

EsgProtocolSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: true,
});

const EsgProtocol = mongoose.model('EsgProtocol', EsgProtocolSchema);
module.exports = {
  EsgProtocol,
  ESG_PROTOCOL_TYPE,
  ESG_APPROVAL_METHOD,
};
