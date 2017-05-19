'use strict';

const Schema = require('mongoose').Schema;
const db = require('../database');

const eventSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    post_time: {
        type: Date,
        default: Date.now,
        require: true
    }
});

module.exports = db.model('event', eventSchema);
