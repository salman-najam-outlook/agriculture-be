const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiscussionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdByUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    createdByCfUserId: {
        type: Number,
        required: true,
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    cfOrganizationId: {
        type: Number,
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Discussion',
        default: null
    },
    assignedToUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    assignedToCfUserId: {
        type: Number,
        default: null
    },
    protocolId: {
        type: Schema.Types.ObjectId,
        ref: 'EsgProtocol',
        required: true
    },
    hasAttachments: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for replies
DiscussionSchema.virtual('replies', {
    ref: 'Discussion',
    localField: '_id',
    foreignField: 'parentId'
});

// Virtual for attachments
DiscussionSchema.virtual('attachments', {
    ref: 'Attachment',
    localField: '_id',
    foreignField: 'discussionId'
});

const Discussion = mongoose.model('Discussion', DiscussionSchema);
module.exports = Discussion;