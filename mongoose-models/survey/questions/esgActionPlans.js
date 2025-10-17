const mongoose = require('mongoose');

const esgActionPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isFileRequired: {
        type: Boolean,
        default: false
    },
    esgAssessmentQuestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'esgAssessmentQuestion',
        required: true
    },
    esgAssessmentQuestionOptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'esgAssessmentQuestionOption',
        default: null
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
}, { timestamps: true });

const esgActionPlan = mongoose.model('esgActionPlan', esgActionPlanSchema);
module.exports = esgActionPlan;