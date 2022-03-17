/**
 * Events Model
 */

// Dependencies
const {Schema, model} = require('mongoose');

// Event Schema
const eventSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
    location: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Event Model
const Event = model('Event', eventSchema);

// Exporting Model
module.exports = Event;