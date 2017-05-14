'use strict';

const _ = require('lodash');
const async = require('async');
const categoryCtl = require('../database/controller/category');
const courseCtl = require('../database/controller/course');
const userCtl = require('../database/controller/user');
const commentCtl = require('../database/controller/comments');
const scoreCtl = require('../database/controller/score');
const CustomError = require('../error');
const Utils = require('../utils');

class Api {
    /**
     * 获取所有课程分类
     * @param req
     * @param res
     */
    static getAllCategories (req, res) {
        categoryCtl.findAllCategories((err, docs) => {
            if (err) {
                return res.endError(err);
            }
            res.json(docs);
        });
    }

    /**
     * 获取单个课程分类
     * @param req
     * @param res
     */
    static getOneCategory (req, res) {
        const categoryId = req.params.category_id;
        categoryCtl.findCategoryById(categoryId, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 获取所有课程
     * @param req
     * @param res
     */
    static getAllCourses (req, res) {
        courseCtl.findAllCourse((err, docs) => {
            if (err) {
                return res.endError(err);
            }
            res.json(docs);
        });
    }

    /**
     * 获取单个课程
     * @param req
     * @param res
     */
    static getOneCourse (req, res) {
        const courseId = req.params.course_id;
        courseCtl.findCourseById(courseId, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 获取某分类下的所有课程
     * @param req
     * @param res
     */
    static getCoursesInOneCategory (req, res) {
        const categoryId = req.params.category_id;
        courseCtl.findCoursesByCategoryId (categoryId, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 新增一个课程
     * @param req
     * @param res
     */
    static createOneCourse (req, res) {
        const course = req.body;
        courseCtl.createOneCourse(course, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 新增一个chapter
     * @param req
     * @param res
     */
    static createOneChapter (req, res) {
        const chapter = req.body;
        const courseId = req.params.course_id;
        courseCtl.createOneChapter(courseId, chapter, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 新增一个section
     * @param req
     * @param res
     */
    static createOneSection (req, res) {
        const section = req.body;
        const {course_id, chapter_id} = req.params;
        courseCtl.createOneSection(course_id, chapter_id, section, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 更新course信息
     * @param req
     * @param res
     */
    static updateOneCourse (req, res) {
        const newCourse = req.body;
        const courseId = req.params.course_id;
        const canUpdateKeys = ['course_name', 'teacher', 'post_time', 'picture', 'category_id', 'description', 'comments', 'be_liked'];
        courseCtl.updateOneCourse(courseId, _.pick(newCourse, canUpdateKeys), (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 更新chapter信息
     * @param req
     * @param res
     */
    static updateOneChapter (req, res) {
        const newChapter = req.body;
        const {course_id, chapter_id} = req.params;
        const canUpdateKeys = ['title'];
        courseCtl.updateOneChapter(course_id, chapter_id, _.pick(newChapter, canUpdateKeys), (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 更新section信息
     * @param req
     * @param res
     */
    static updateOneSection (req, res) {
        const newSection = req.body;
        const {course_id, chapter_id, section_id} = req.params;
        const canUpdateKeys = ['title', 'video', 'html'];
        courseCtl.updateOneSection(course_id, chapter_id, section_id, _.pick(newSection, canUpdateKeys), (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }


    static deleteOneCourse (req, res) {
        const courseId = req.params.course_id;
        courseCtl.deleteOneCourse(courseId, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    static deleteOneChapter (req, res) {
        const {course_id, chapter_id} = req.params;
        courseCtl.deleteOneChapter(course_id, chapter_id, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    static deleteOneSection (req, res) {
        const {course_id, chapter_id, section_id} = req.params;
        courseCtl.deleteOneSection(course_id, chapter_id, section_id, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        })
    }
    /**
     * 用户注册
     * @param req
     * @param res
     */
    static register (req, res) {
        const body = req.body;
        const username = body.username;
        const password = Utils.encryptPassword(body.password);
        async.waterfall([
            // 查找用户名是否已经注册
            (callback) => {
               userCtl.findByUsername(username, (err, doc) => {
                   if (err) {
                       return callback(err);
                   }
                   if (doc) {
                      return callback(new CustomError({code: 1002}))
                   }
                   return callback();
               });
            },
            // 创建新用户
            (callback) => {
                userCtl.createUser(username, password, (err, doc) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, doc);
                });
            }
        ], (err, result) => {
            if (err) {
                return res.endError(err);
            }
            return res.json(_.pick(result, '_id', 'username', 'reg_time'));
        });
    }

    /**
     * 用户登陆
     * @param req
     * @param res
     */
    static login (req, res) {
        const body = req.body;
        const username = body.username;
        const password = Utils.encryptPassword(body.password);
        async.waterfall([
            // 判断用户是否存在
            (callback) => {
                userCtl.findByUsername(username, (err, doc) => {
                    if (err) {
                        return callback(err);
                    }
                    if (!doc) {
                        return callback(new CustomError({code: 1000}))
                    }
                    return callback(null, doc);
                })
            },
            // 校验密码是否正确
            (result, callback) => {
                if (result.password !== password) {
                    return callback(new CustomError({code: 1001}));
                }
                return callback(null, result);
            },
            // 更新最后一次登陆时间
            (result, callback) => {
                userCtl.updateLoginTime(result._id, (err, doc) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, doc);
                })
            }
        ], (err, result) => {
            if (err) {
                return res.endError(err);
            }
            // 保存session
            req.session.user = result;
            return res.json(_.pick(result, '_id', 'username', 'reg_time', 'last_login_time', 'likes', 'collections'));
        });
    }

    /**
     * 用户登出
     * @param req
     * @param res
     */
    static logout (req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.endError(err);
            }
            return res.sendStatus(200);
        });
    }

    static createOneComment (req, res) {
        const comment = req.body;
        commentCtl.createOneComment(comment, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    static getCommentsByQuery (req, res) {
        const query = req.query;
        commentCtl.findCommentsByQuery(query, (err, docs) => {
            if (err) {
                return res.endError(err);
            }
            res.json(docs);
        });
    }

    static createOneScore (req, res) {
        const score = req.body;
        scoreCtl.createOneScore(score, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    static getScoresByQuery (req, res) {
        const query = req.query;
        scoreCtl.findScoresByQuery(query, (err, docs) => {
            if (err) {
                return res.endError(err);
            }
            res.json(docs);
        });
    }

    static updateOneScore (req, res) {
        const query = req.query;
        const {score} = req.body;
        scoreCtl.findByQueryAndUpdate(query, score, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    static addOneLike (req, res) {
        const {user_id} = req.params;
        const {section_id} = req.body;
        userCtl.addOneLike(user_id, section_id, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    static deleteOneLike (req, res) {
        const {user_id} = req.params;
        const {section_id} = req.body;
        userCtl.deleteOneLike(user_id, section_id, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }
}

module.exports = Api;