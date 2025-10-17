const mongoose = require('mongoose');

const esgAssessmentQuestionHeadingSchema = new mongoose.Schema({
    esgAssessmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessment', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    targetYear: {
        type: Number,
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
    deletedAt: { 
        type: Date, 
        default: null
    },
}, { timestamps: true });

const esgAssessmentQuestionHeading = mongoose.model('esgAssessmentQuestionHeading', esgAssessmentQuestionHeadingSchema);

module.exports = esgAssessmentQuestionHeading;