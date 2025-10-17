const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EsgProtocolResponseInformationSchema = new Schema({
    esgAssessmentResponseInformationId: {
      type: Array,
      default: null
    },
    esgProtocolId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true
    },
    submittedByType: {
      type: String,
      default:'user',
      enum:['supplier','user', 'sub-organization']
    },
    submittedById: {
      type: mongoose.Schema.Types.ObjectId, 
      default: null
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId, 
      default: null
    },
    status: {
      type: String,
      enum:['submitted','pending','approved','rejected'],
      default:'submitted'
    },
    statusUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId, 
      default: null
    },
    rejectionReason: {
      type: String,
      default: null
    },
    rejectedByUserId: {
      type: mongoose.Schema.Types.ObjectId, 
      default: null
    },
  }, { 
    timestamps: true
  });


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
  
  const esgProtocolResponseInformation = mongoose.model('EsgProtocolResponseInformation', EsgProtocolResponseInformationSchema);
  
  module.exports = {
    EsgProtocolResponseInformation:esgProtocolResponseInformation
  };