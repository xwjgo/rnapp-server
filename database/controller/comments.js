'use strict';

const _ = require('lodash');
const Comment = require('../models/comment');

class commentCtl {
    static createOneComment (comment, callback) {
        const newComment = new Comment(comment);
        newComment.save(callback);
    }

    static findCommentsBySectionId (sectionId, callback) {
        Comment.find({
            section_id: sectionId
        }, callback);
    }
}

module.exports = commentCtl;