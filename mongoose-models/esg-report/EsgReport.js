const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const EsgReportSchema = new Schema({
  reportId: { type: String, required: true },
  reportType: { type: String, enum: ['private', 'public'], required: true },
  dateGenerated: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['saved', 'publishingToBlockchain', 'publishToBlockchain'], 
    required: true 
  },
  esgProtocolId: { type: Types.ObjectId, ref: 'EsgProtocol', required: true },
  reportTimeline: { type: [String], default: [] },
  subOrganizationIds: { type: Schema.Types.Mixed },
  templateId: { type: Types.ObjectId, ref: 'EsgReportTemplate', required: true },
  deletedAt: { type: Date, default: null },
  organizationId: { type: Types.ObjectId, ref: 'Organization', required: true },
}, { timestamps: true });

module.exports = mongoose.model('EsgReport', EsgReportSchema);