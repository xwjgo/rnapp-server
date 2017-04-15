'use strict';

const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const db = require('../database');

/**
 * 课程内容存储结构
 * @property {String} course_name - 课程名称
 * @property {String} teacher - 教师名称
 * @property {Date} post_time - 课程发布时间
 * @property {String} picture - 课程封面图片的路径
 * @property {String} category - 课程所属分类
 * @property {String} description - 课程描述
 * @property {Array} chapters - 课程章节
 * @property {Array} comments - 课程评论id
 * @property {Array} be_liked - 收藏该课程的用户id
 */
const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    teacher: String,
    post_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    picture: String,
    category_id: ObjectId,
    description: String,
    chapters: [{
        title: String,
        sections: [{
            title: String,
            video: String,
            html: String
        }]
    }],
    comments: [ObjectId],
    be_liked: [ObjectId]
});

module.exports = db.model('course', courseSchema);