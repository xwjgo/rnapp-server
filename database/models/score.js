'use strict';

const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const db = require('../database');

/**
 * 用户评分的数据结构
 * @property user_id - 用户id
 * @property section_id - 小节id
 * @property score - 分数
 */
const scoreSchema = new Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    section_id: {
        type: ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

module.exports = db.model('score', scoreSchema);