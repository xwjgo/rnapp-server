'use strict';

const _ = require('lodash');
const async = require('async');
const categoryCtl = require('../database/controller/category');
const courseCtl = require('../database/controller/course');
const userCtl = require('../database/controller/user');
const ObjectId = require('mongoose').Types.ObjectId;

class Api {
    /**
     * 获取所有课程分类
     * @param req
     * @param res
     */
    static getAllCategories (req, res) {
        categoryCtl.findAllCategories((err, docs) => {
            if (err) {
                console.error(err.stack);
                res.send(500);
                return;
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
            console.error(err.stack);
            res.send(406);
            return;
        }
        categoryCtl.findCategoryById(categoryId, (err, doc) => {
            if (err) {
                console.error(err.stack);
                res.send(500);
                return;
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
                console.error(err.stack);
                res.send(500);
                return;
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
            console.error(err.stack);
            return res.sendStatus(406);
        }
        courseCtl.findCourseById(courseId, (err, doc) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
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
        const password = body.password;
        async.auto({
            // 查找用户名是否已经注册
            getUser: (callback) => {
               userCtl.findByUsername(username, (err, doc) => {
                   if (err) {
                       return callback(err);
                   }
                   return callback(null, doc);
               });
            },
            // 创建新用户
            createUser: ['getUser', (results, callback) => {
                const user = results.getUser;
                if (user) {
                    return callback(null, user);
                }
                userCtl.createUser(username, password, (err, doc) => {
                    if (err) {
                        return callback(err);
                    }
                    res.json(_.pick(doc, '_id', 'username', 'reg_time'));
                    return callback();
                });
            }]
        }, (err, results) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
            if (results.createUser) {
                return res.status(403).send('该用户名已经注册');
            }
        });
    }

    /**
     * 用户登陆
     * @param req
     * @param res
     */
    static login (req, res) {

    }
}

module.exports = Api;