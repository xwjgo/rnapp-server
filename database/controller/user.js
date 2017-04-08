'use strict';

const User = require('../models/user');

class UserCtl {
    static createUser (username, password, callback) {
        const user = new User({
            username: username,
            password: password,
            reg_time: new Date()
        });
        user.save(callback);
    }

    static findByUsername (username, callback) {
        User.findOne({username: username}, callback);
    }
}

module.exports = UserCtl;