const mongoose = require('mongoose');
const RESPONSE_INFORMATION_STATUS = {
    NOT_STARTED: 'not-started',
    IN_PROGRESS: 'progress',
    COMPLETED: 'completed',
    SUBMITTED: 'submitted',
    PUBLISHED: 'published',
}

const esgAssessmentResponseInformation = new mongoose.Schema({
    esgAssessmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'esgAssessment', 
        required: true 
    },
    submittedById:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    submittedByType:{
        type: String,
        enum:['supplier','user', 'sub-organization'],
        default:'user'
    },
    submittedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    nextStep:{
        type:Number,
        required:false,
    },
    status:{
        type: String,
        required:true,
        enum:Object.values(RESPONSE_INFORMATION_STATUS),
        default:RESPONSE_INFORMATION_STATUS.IN_PROGRESS
    },
    progress:{
        type: Number,
        required:false,
        default:0
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

const EsgAssessmentResponseInformation = mongoose.model('EsgAssessmentResponseInformation', esgAssessmentResponseInformation);

module.exports = {
    EsgAssessmentResponseInformation,
    RESPONSE_INFORMATION_STATUS
};