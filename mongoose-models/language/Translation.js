const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    sourceText: {
        type: String,
        required: true
    },
    sourceLanguage: {
        type: String,
        default: 'en'
    },

    translations: {
        type: Map,
        of: String,
        default: {}
    },

    module: [{
        type: String
    }],

    timestamp: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date
    },
    source: {
        type: String,
        default: 'aws'
    },
    metadata: {
        usageCount: {
            type: Number,
            default: 0
        },
        lastAccessed: {
            type: Date
        },
    },
});

module.exports = mongoose.model('Translation', translationSchema);