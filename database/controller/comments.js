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
}

module.exports = commentCtl;