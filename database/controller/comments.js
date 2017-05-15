'use strict';

const _ = require('lodash');
const Comment = require('../models/comment');

class commentCtl {
    static createOneComment (comment, callback) {
        const newComment = new Comment(comment);
        newComment.save(callback);
    }

    static findCommentsByQuery (query, callback) {
        Comment.find(query, callback);
    }

    static addOneCommentLike (comment_id, user_id, callback) {
        Comment.findByIdAndUpdate(comment_id, {$addToSet: {be_liked: user_id}}, {new: true}, callback);
    }

    static deleteOneCommentLike (comment_id, user_id, callback) {
        Comment.findByIdAndUpdate(comment_id, {$pull: {be_liked: user_id}}, {new: true}, callback);
    }
}

module.exports = commentCtl;