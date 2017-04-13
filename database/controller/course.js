'use strict';

const Course = require('../models/course');
/**
 * 课程控制器
 * @class CourseCtl
 */
class CourseCtl {
    /**
     * 获取所有课程
     * @param callback
     */
    static findAllCourse (callback) {
        Course.find({}, callback);
    }

    /**
     * 根据id来获取课程
     * @param id
     * @param callback
     */
    static findCourseById (id, callback) {
        Course.findById(id, callback);
    }

    /**
     * 根据分类id来获取某分类下所有课程
     * @param id
     * @param callback
     */
    static findCoursesByCategoryId (id, callback) {
        Course.find({category_id: id}, callback);
    }
}

module.exports = CourseCtl;