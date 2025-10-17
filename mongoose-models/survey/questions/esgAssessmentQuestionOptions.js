const mongoose = require('mongoose');

const esgAssessmentQuestionOptionSchema = new mongoose.Schema({
    label: { 
        type: String, 
        required: true 
    },
    score: { 
        type: Number, 
        default: 0 
    },
    recommendation: { 
        type: String, 
        default: '' 
    },
    isDimitraModulesEnabled: { 
        type: Boolean, 
        default: false 
    },
    isActionPlanEnabled: { 
        type: Boolean, 
        default: false 
    },
    isGetDataEnabled: { 
        type: Boolean, 
        default: false 
    },
    isRecommendationEnabled: { 
        type: Boolean, 
        default: false 
    },
    actionPlanScore: { 
        type: Number, 
        default: 0 
    },
    getDataScore: { 
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
    esgAssessmentQuestionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessmentQuestion', 
        required: true 
    },
    deletedAt: { 
        type: Date, 
        default: null 
    },
}, { timestamps: true });

const esgAssessmentQuestionOption = mongoose.model('esgAssessmentQuestionOption', esgAssessmentQuestionOptionSchema);

module.exports = esgAssessmentQuestionOption;