'use strict';

const Schema = require('mongoose').Schema;
const db = require('../database');

/**
 * 课程分类存储结构
 * @property {String} category_name - 分类名称
 * @property {Array} courses - 该分类下所有课程的ObjectId
 */
const categorySchema = new Schema({
    category_name: {
        type: String,
        required: true
    }
});

module.exports = db.model('category', categorySchema);