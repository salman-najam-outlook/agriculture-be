const mongoose = require('mongoose');
const esgAssessment = require('./esgAssessment');
const { EsgGoal } = require('../../EsgGoal');
const EsgHeading = require('./esgAssessmentQuestionHeading');
const logUserActivityPlugin = require('../../../plugins/activity-log');

const esgAssessmentQuestionSchema = new mongoose.Schema({
    esgAssessmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessment', 
        required: true 
    },
    esgHeadingId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessmentQuestionHeading', 
        required: true 
    },
    order: { 
        type: Number, 
        required: true 
    },
    createdBy: { 
        type: Number, 
        required: true 
    },
    orgId: { 
        type: Number,
        required: true
    },
    title: { 
        type: String, 
        // required: true 
    },
    questionType: { 
        type: String, 
        enum: [
            'text-field', 
            'text-area', 
            'numeric', 
            'radio-button', 
            'check-boxes', 
            'get-data', 
            'digital-signature',
            'attach-files'
        ], 
        // required: true 
    },
    isMandatory: { 
        type: Boolean, 
        default: false 
    },
    isRepeatEnabled: { 
        type: Boolean, 
        default: false 
    },
    isScoreEnabled: { 
        type: Boolean, 
        default: false 
    },
    score: {
        type: Number,
        required: false,
        default: null,
    },
    respondentType: { 
        type: String, 
        enum: ['Farmer (Single response for all farms)', 'Farmer (Separate response for each farm)', 'Sub-Organization', 'Supplier'], 
        // required: true 
    },
    additionalSetting: { 
        type: mongoose.Schema.Types.Mixed,
        default: {} 
    },
    repetitionPeriod: { 
        type: String, 
        enum: ["Day", "Week", "Month", "Quarter", "Year"], 
        default: 'Month' 
    },
    repetitionCount: { 
        type: Number, 
        default: 0 
    },
    repetitionDates: { 
        type: [Date], 
        default: [] 
    },
    repeatType: { 
        type: String, 
        enum: ['Fixed', 'Custom'], 
        default: 'Fixed' 
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

/**
 * Helper Function: Update `noOfQuestions` in esgAssessment
 */
const updateQuestionCount = async (assessmentId) => {
  const activeHeadings = await EsgHeading.find({
    esgAssessmentId: assessmentId,
    deletedAt: null
  }).select('_id');

  const activeHeadingIds = activeHeadings.map(h => h._id.toString());

  const count = await esgAssessmentQuestion.countDocuments({
    esgAssessmentId: assessmentId,
    esgHeadingId: { $in: activeHeadingIds },
    deletedAt: null
  });
    

  await Promise.all([
    esgAssessment.findByIdAndUpdate(assessmentId, { noOfQuestions: count }, { new: true }),
    EsgGoal.updateMany(
      { esgAssessment: assessmentId },
      { noOfQuestions: count },
        {
            runValidators: false
        }
    ).exec()
  ]);
};

/**
 *  When a new question is added, update `noOfQuestions`
 */
esgAssessmentQuestionSchema.post("save", async function (doc, next) {
    await updateQuestionCount(doc.esgAssessmentId);
    next();
});

/**
 *  When a question is deleted, update `noOfQuestions`
 */
esgAssessmentQuestionSchema.post("findOneAndUpdate", async function (doc, next) {
    if (doc?.deletedAt) {
        await updateQuestionCount(doc.esgAssessmentId);
    }
    next();
});

/**
 * When a question is permanently deleted, update `noOfQuestions`
 */
esgAssessmentQuestionSchema.post("deleteOne", async function (doc, next) {
    await updateQuestionCount(doc.esgAssessmentId);
    next();
});

esgAssessmentQuestionSchema.plugin(logUserActivityPlugin, {
  taggedRelations: [
    'esgAssessmentId',
    {
      path: 'esgProtocol',
      through: {
        model: EsgGoal,
        localKey: 'esgAssessmentId',
        foreignKey: 'esgAssessment',
        taggedModelName: 'EsgProtocol',
      }
    },
  ],
  deleteKey: 'deletedAt',
});

const esgAssessmentQuestion = mongoose.model('esgAssessmentQuestion', esgAssessmentQuestionSchema);

module.exports = esgAssessmentQuestion;