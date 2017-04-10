'use strict';

const _ = require('lodash');
const async = require('async');
const categoryCtl = require('../database/controller/category');
const courseCtl = require('../database/controller/course');
const userCtl = require('../database/controller/user');
const CustomError = require('../error');
const ObjectId = require('mongoose').Types.ObjectId;
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
        let categoryId;
        // 尝试将url中的id转化为ObjectId
        try {
            categoryId = new ObjectId(req.params.category_id);
        } catch (err) {
            return res.endError(new CustomError({code: 1003}));
        }
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
        let courseId;
        //尝试将url中的course_id转化为ObjectId
        try {
            courseId = new ObjectId(req.params.course_id);
        } catch (err) {
            return res.endError(new CustomError({code: 1003}));
        }
        courseCtl.findCourseById(courseId, (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
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
}

module.exports = Api;