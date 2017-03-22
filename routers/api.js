'use strict';

const categoryCtl = require('../database/controller/category');
const courseCtl = require('../database/controller/course');
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
            res.send(406);
            return;
        }
        courseCtl.findCourseById(courseId, (err, doc) => {
            if (err) {
                console.error(err.stack);
                res.send(500);
                return;
            }
            res.json(doc);
        });
    }
}

module.exports = Api;