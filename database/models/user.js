'use strict';

const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const db = require('../database');

const userSchema = new Schema ({
    username: {
        type: String,
        match: /^\w+$/,
        required: true,
        unique: true
    },
    password: {
        type: String,
        math: /^\w+$/,
        require: true
    },
    reg_time: {
        type: Date,
        default: null
    },
    last_login_time: {
        type: Date,
        default: null
    },
    likes: [ObjectId]
});

module.exports = db.model('user', userSchema);