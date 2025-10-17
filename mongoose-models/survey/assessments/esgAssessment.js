const mongoose = require('mongoose');
const logUserActivityPlugin = require('../../../plugins/activity-log');
const { EsgGoal } = require('../../EsgGoal');

const esgAssessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
     instructions: {
        type: String
    },
    multiStepType: {
        type: String,
        enum: ['Question', 'Heading']
    },
    multiStepQuestionCount: {
        type: Number
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isScoreEnabled: {
        type: Boolean,
        default: false
    },
    respondentType: { 
        type: String, 
        enum: ['Farmer (Single response for all farms)', 'Farmer (Separate response for each farm)', 'Sub-Organization', 'Supplier'], 
        required: true 
    },
    noOfQuestions: {
        type: Number,
        default: 0
    },
     orgId: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Number,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    parentSurveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'esgAssessment',
        default: null
    },
},
    { timestamps: true }
);

esgAssessmentSchema.plugin(logUserActivityPlugin, {
    taggedRelations: [
      '_id',
        {
            path: 'esgProtocol',
            through: {
                model: EsgGoal,
                localKey: '_id',
                foreignKey: 'esgAssessment',
                taggedModelName: 'EsgProtocol',
            }
        },
    ],
    excludeKeys: ['noOfQuestions'],
    deleteKey: 'deletedAt',
    modelName: 'esgAssessment',
});

const esgAssessment = mongoose.model('esgAssessment', esgAssessmentSchema);

module.exports = esgAssessment;