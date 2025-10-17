const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComponentSchema = new Schema({
  type: {
    type: String,
    enum: [
      'heading',
      'paragraph',
      'image',
      'stakeholder',
      'table',
      'connectedFarm',
      'esgProgressLineChart',
      'esgScorecard'
    ],
    required: true,
  },
  content: {
    type: Schema.Types.Mixed,
    default: {},
  },
  settings: {
    type: Schema.Types.Mixed,
    default: {},
  },
});

const SectionSchema = new Schema({  
  title: { type: String, default: '' },
  order: { type: Number, default: 0 },
  settings: {
    type: Schema.Types.Mixed,
    default: {},
  },
  components: {
    type: [ComponentSchema],
    default: [],
  },
});

const EsgReportTemplateSchema = new Schema({
  templateName: { type: String, required: true },
  templateSettings: { type: Schema.Types.Mixed, default: {} },
  deletedAt: { type: Date, default: null },
  sections: {
    type: [SectionSchema],
    default:[],
  },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
}, { timestamps: true });

module.exports = mongoose.model('EsgReportTemplate', EsgReportTemplateSchema);
