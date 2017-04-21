'use strict';

const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const db = require('../database');

/**
 * 用户评论的数据结构
 * @property parent_id - 父评论的id
 * @property section_id - 小节id
 * @property user_id - 发表该评论的用户id
 * @property post_time - 评论发表时间
 * @property content - 评论内容
 * @property be_liked - 该评论的点赞用户
 */
const commentSchema = new Schema({
    parent_id: ObjectId,
    section_id: {
        type: ObjectId,
        required: true
    },
    user_id: {
        type: ObjectId,
        required: true
    },
    post_time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    be_liked: [ObjectId]
});

module.exports = db.model('comment', commentSchema);