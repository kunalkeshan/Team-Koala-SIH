/**
 * Activity Log Schema
 */

// Dependencies
const { Schema, model } = require('mongoose');

// Log Schema
const logSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    type: {
        type: String,
    },
    log: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

// Log Model
const Log = model('Log', logSchema);

// Exporting Model
module.exports = Log;
