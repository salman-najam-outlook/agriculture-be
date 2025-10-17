const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema({
  s3Key: {
    type: String,
    required: false
  },
  fileUrl: {
    type: String,
    required: true
  },
  createdByUser: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdByCfUserId: {
    type: Number,
    required: true,
  },
  protocolId: {
    type: Schema.Types.ObjectId,
    ref: 'EsgProtocol',
    required: true
  },
  discussionId: {
    type: Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Attachment = mongoose.model('Attachment', AttachmentSchema);
module.exports = Attachment;