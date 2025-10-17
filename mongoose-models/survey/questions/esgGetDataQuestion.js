const mongoose = require('mongoose');

const esgGetDataQuestionSchema = new mongoose.Schema({
    dataType: { 
        type: String, 
        enum: [
            'text-field', 
            'text-area', 
            'numeric', 
            'radio-button', 
            'check-boxes', 
            'measurement-unit', 
            'attach-file', 
            'digital-signature'
        ], 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    isMandatory: { 
        type: Boolean, 
        default: false 
    },
    optionValues: {
        type: [String],
        default: [],
    },
    esgAssessmentQuestionOptionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessmentQuestionOption', 
        default: null 
    },
    esgAssessmentQuestionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessmentQuestion', 
        required: true 
    },
    helpText: { 
        type: String, 
        default: '' 
    },
    helpEnabled: { 
        type: Boolean, 
        default: false
    },
    additionalSettings: { 
        type: mongoose.Schema.Types.Mixed, 
        default: {} 
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

const esgGetDataQuestion = mongoose.model('esgGetDataQuestion', esgGetDataQuestionSchema);

module.exports = esgGetDataQuestion;
