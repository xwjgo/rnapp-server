'use strict';

const Course = require('../models/course');
const CustomError = require('../../error');
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
     * 增加course
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
     * 增加chapter
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
     * 增加section
     * @param courseId
     * @param chapterId
     * @param section
     * @param callback
     */
    static createOneSection (courseId, chapterId, section, callback) {
        Course.findOne({
            _id: courseId,
            "chapters._id": chapterId
        }).exec((err, doc) => {
            if (err) {
                return callback(err);
            }
            if (!doc) {
                return callback(new CustomError({code: 2000}));
            }
            doc.chapters.id(chapterId).sections.push(section);
            doc.save(callback);
        });
    }

    /**
     * 更新course
     * @param courseId
     * @param newCourse
     * @param callback
     */
    static updateOneCourse (courseId, newCourse, callback) {
        Course.findByIdAndUpdate(courseId, {
            $set: newCourse
        }, {
            new: true
        }, callback);
    }

    /**
     * 更新chapter
     * @param courseId
     * @param chapterId
     * @param newChapter
     * @param callback
     */
    static updateOneChapter (courseId, chapterId, newChapter, callback) {
        Course.findById(courseId).exec((err, doc) => {
            if (err) {
                return callback(err);
            }
            if (!doc) {
                return callback(new CustomError({code: 2000}))
            }
            doc.chapters.id(chapterId).set(newChapter);
            doc.save(callback);
        });
    }

    /**
     * 更新section
     * @param courseId
     * @param chapterId
     * @param sectionId
     * @param newSection
     * @param callback
     */
    static updateOneSection (courseId, chapterId, sectionId, newSection, callback) {
        Course.findOne({
            _id: courseId,
            "chapters._id": chapterId
        }).exec((err, doc) => {
            if (err) {
                return callback(err);
            }
            if (!doc) {
                return callback(new CustomError({code: 2000}));
            }
            doc.chapters.id(chapterId).sections.id(sectionId).set(newSection);
            doc.save(callback);
        });
    }

    static deleteOneCourse (courseId, callback) {
        Course.findByIdAndRemove(courseId, callback);
    }

    static deleteOneChapter (courseId, chapterId, callback) {
        Course.findById(courseId).exec((err, doc) => {
            if (err) {
                return callback(err);
            }
            if (!doc) {
                return callback(new CustomError({code: 2000}));
            }
            doc.chapters.pull({_id: chapterId});
            doc.save(callback);
        });
    }

    static deleteOneSection (courseId, chapterId, sectionId, callback) {
        Course.findOne({
            _id: courseId,
            "chapters._id": chapterId
        }).exec((err, doc) => {
            if (err) {
                return callback(err);
            }
            if (!doc) {
                return callback(new CustomError({code: 2000}));
            }
            doc.chapters.id(chapterId).sections.pull({_id: sectionId});
            doc.save(callback);
        });
    }
}

module.exports = CourseCtl;