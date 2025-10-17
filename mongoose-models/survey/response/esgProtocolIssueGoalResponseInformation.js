const mongoose = require('mongoose');

const esgProtocolIssueGoalResponseInformation = new mongoose.Schema({
  esgAssessmentResponseInformationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  esgProtocolId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  esgIssueId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  esgGoalId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'EsgGoal',
    required: true
  },
  esgAssessmentId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  esgProtocolResponseInformationId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: false
  },
  submittedByType: {
    type: String,
    default:'user',
    enum:['supplier','user', 'sub-organization'],
  },
  submittedById: {
    type: mongoose.Schema.Types.ObjectId, 
    default: null
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically manage createdAt and updatedAt
});

const EsgProtocolIssueGoalResponseInformation = mongoose.model('EsgProtocolIssueGoalResponseInformation', esgProtocolIssueGoalResponseInformation);

module.exports = {
  EsgProtocolIssueGoalResponseInformation
};