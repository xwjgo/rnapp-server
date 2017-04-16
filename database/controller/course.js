'use strict';

const Course = require('../models/course');
const ObjectId = require('mongoose').Schema.Types.ObjectId;
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

    /**
     * 增加课程
     * @param course
     * @param callback
     */
    static createOneCourse (course, callback) {
        const newCourse = new Course({
            course_name: course.course_name,
            category_id: course.category_id
        });
        newCourse.save(callback);
    }

    /**
     * 根据courseId来增加chapter
     * @param courseId
     * @param chapter
     * @param callback
     */
    static createOneChapter (courseId, chapter, callback) {
        Course.findByIdAndUpdate(courseId, {
            $push: {
                chapters: {title: chapter.title}
            }
        }, {
            new: true
        }, callback);
    }

    /**
     * 根据chapterId来增加section
     * @param chapterId
     * @param section
     * @param callback
     */
    static createOneSection (chapterId, section, callback) {
        Course.findOneAndUpdate({
            chapters: {
                $elemMatch: {_id: chapterId}
            }
        }, {
            $push: {
                "chapters.$.sections": {title: section.title}
            }
        }, {
            new: true
        }, callback);
    }
}

module.exports = CourseCtl;