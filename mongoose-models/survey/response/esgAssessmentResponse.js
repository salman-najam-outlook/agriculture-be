const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const esgAssessmentResponse = new Schema({
    esgAssessmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessment', 
        required: true 
    },
    esgQuestionId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessmentQuestion', 
        required: true  
    },
    esgQuestionDetail:{
        type: Schema.Types.Mixed, 
        required: true,
        default:{}  
    },
    response:{
        type: Schema.Types.Mixed, 
        required: true,
        default:{}   
    },
    esgAssessmentResponseInformationId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'EsgAssessmentResponseInformationModel', 
        required: true  
    },
    questionScore:{
        type: Number,
        required: false,
        default:0
    },
    responseScore:{
        type: Number,
        required: false,
        default:0
    },
    isLatestVersionResponse:{
        type: Boolean, 
        required: true,
        default:false   
    },
    submittedById:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    submittedByType: {
        type: String,
        enum:['supplier','user', 'sub-organization'],
        default:'user',
        required: true
    },
    submittedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    rejectionReason:{
        type: String,
        required: false, 
        default:null
    },
    rejectedByUserId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false,
        default:null
    },
    orgId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization',  
    },
},
    { timestamps: true }
);

// esgAssessmentSchema.plugin(logUserActivityPlugin, {
//     taggedRelations: [
//       '_id',
//         {
//             path: 'esgProtocol',
//             through: {
//                 model: EsgGoal,
//                 localKey: '_id',
//                 foreignKey: 'esgAssessment',
//                 taggedModelName: 'EsgProtocol',
//             }
//         },
//     ],
//     excludeKeys: ['noOfQuestions'],
//     deleteKey: 'deletedAt',
//     modelName: 'esgAssessment',
// });

const EsgAssessmentResponse = mongoose.model('EsgAssessmentResponse', esgAssessmentResponse);

module.exports = {
    EsgAssessmentResponse
};