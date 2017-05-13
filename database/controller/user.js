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

    static updateLoginTime(uid, callback) {
        User.findByIdAndUpdate(uid, {$set: {last_login_time: new Date()}}, {new: true}, callback);
    }

    static addOneLike (userId, sectionId, callback) {
        User.findByIdAndUpdate(userId, {$addToSet: {likes: sectionId}}, {new: true}, callback);
    }

    static deleteOneLike (userId, sectionId, callback) {
        User.findByIdAndUpdate(userId, {$pull: {likes: sectionId}}, {new: true}, callback);
    }
}

module.exports = UserCtl;