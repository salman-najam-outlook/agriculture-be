const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Organization Schema
 * Represents an organization in the MongoDB database;
 */

const orgSchema = new Schema(
    {
        cfOrgId: {
            type: Number,
            required: [true, 'CF organization ID is required.'],
        },
        name: {
            type: String,
            required: [true, 'Organization name is required.'],
            trim: true,
            maxlength: [100, 'Organization name cannot exceed 100 characters'],
        },
        code: {
            type: String,
            required: [true, 'Organization code is required'],
            unique: true,
            trim: true,
            maxlength: [100, 'Organization code cannot exceed 10 characters'],
        },
        product: {
            type: mongoose.Schema.Types.Mixed,
            trim: true,
            default: []
        },
        country: {
            type: String,
            trim: true,
        },
        logo:{
            type: String,
            required: false,
        },
        accessment_reporturl:{
            type: String,
            required: false,
        },
        lincense_id: {
            type: String,
            trim: true,
            required: false,
        },
        status: {
            type: Boolean,
            trim: true,
            default:true
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        isSubOrganization: {
            type: Boolean,
            default: false
        },
        primaryUserId: {
            type: Number,
            default: null
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: {
            virtuals: true,
        }
    }
);
orgSchema.virtual('parentOrganization', {
    ref: 'Organization',
    localField: 'parentId',
    foreignField: 'cfOrgId',
    justOne: true,
});
orgSchema.index({ code: 1 }, { unique: true });

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;