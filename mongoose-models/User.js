const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * User schema
 * Represents a user in MongoDB database
 */

const userSchema = new Schema(
    {
        cfUserId: {
            type: Number,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
        },
        mobile: {
            type: String,
            trim: true,
            match: [/^[0-9]{10,15}$/, 'Please provide a valid mobile number'],
        },
        countryCode: {
            type: Number,
            min: [1, 'Country code must be a positive number'],
        },
        countryId: {
            type: String,
            trim: true,
        },
        countryIsoCode: {
            type: String,
            trim: true,
            uppercase: true,
            maxlength: [3, 'ISO code cannot exceed 3 characters'],
        },
        role: {
            type: String,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
            trim: true,
            maxlength: [200, 'Address cannot exceed 200 characters'],
        },
        eoriNumber: {
            type: String,
            trim: true,
        },
        licenseNumber: {
            type: String,
            trim: true,
        },
        companyId: {
            type: String,
            trim: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        },
        subOrganization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.index({ email: 1 });
userSchema.index({ cfUserId: 1 }, { unique: true });

// virtual for full name
userSchema.virtual('fullName').get(function () {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
});

const User = mongoose.model('User', userSchema);

module.exports = User;
