'use strict';
const _ = require('lodash');
const courseCtl = require('../database/controller/course');
const categoryCtl = require('../database/controller/category');
const async = require('async');


class Sa {
    /**
     * sa页面
     * @param req
     * @param res
     */
    static renderSaPage (req, res) {
        let nodes = [];
        async.auto({
            // 获取所有分类节点
            getCategoryNodes: (callback) => {
                categoryCtl.findAllCategories((err, docs) => {
                    if (err) {
                        return callback(err);
                    }
                    _.forEach(docs, (doc, index) => {
                        let defaultConfig = {
                            id: doc._id,
                            parent: '#',
                            text: doc.category_name,
                            icon: 'iconfont icon-category'
                        };
                        if (index === 0) {
                            nodes.push(_.extend(defaultConfig, {
                                state: {
                                    opened: true
                                }
                            }));
                        } else {
                            nodes.push(defaultConfig)
                        }
                    });
                    return callback(null, nodes);
                })
            },
            // 获取所有course、chapter、section节点
            getOtherNodes: ['getCategoryNodes', (result, callback) => {
                const categoryNodes = result.getCategoryNodes;
                async.each(categoryNodes, (node, cb) => {
                    courseCtl.findCoursesByCategoryId(node.id, (err, docs) => {
                        if (err) {
                            return cb(err);
                        }
                        // course节点
                        _.forEach(docs, (doc) => {
                            nodes.push({
                                id: doc._id,
                                parent: node.id,
                                text: doc.course_name,
                                icon: 'iconfont icon-tree'
                            });
                            // chapter节点
                            const chapterNodes = doc.chapters;
                            _.forEach(chapterNodes, (cNode) => {
                                nodes.push({
                                    id: cNode._id,
                                    parent: doc._id,
                                    text: cNode.title,
                                    icon: 'iconfont icon-leaf',
                                    state: {
                                        disabled: true
                                    }
                                });
                                // section节点
                                const sectionNodes = cNode.sections;
                                _.forEach(sectionNodes, (sNode) => {
                                    nodes.push({
                                        id: sNode._id,
                                        parent: cNode._id,
                                        text: sNode.title,
                                        icon: 'iconfont icon-blog'
                                    });
                                })
                            })
                        });
                        return cb();
                    });
                }, (err) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, nodes);
                });
            }]
        }, (err, result) => {
            if (err) {
                return res.endError(err);
            }
            res.render('sa', {
                nodes: JSON.stringify(result.getOtherNodes)
            });
        });
    }

    /**
     * 更新course中picture等字段信息
     * @param req
     * @param res
     */
    static imageUpload (req, res) {
        const file = req.file;
        const updateObj = {};
        if (file) {
           updateObj.picture = `images/${file.filename}`;
        }
        _.extend(updateObj, _.pickBy(req.body, (val) => {
            return !_.isEmpty(val);
        }));
        // 更新数据库
        const canUpdateKeys = ['picture', 'teacher', 'description'];
        courseCtl.updateOneCourse(updateObj.courseId, _.pick(updateObj, canUpdateKeys), (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 更新section中video等字段信息
     * @param req
     * @param res
     */
    static videoUpload (req, res) {
        const file = req.file;
        const updateObj = {};
        if (file) {
            updateObj.video = `videos/${file.filename}`;
        }
        _.extend(updateObj, _.pickBy(req.body, (val, key) => {
            if (key === 'html') {
                return !_.isEqual(val, '<p><br></p>');
            }
            return !_.isEmpty(val);
        }));
        console.log(updateObj);
        // 更新数据库
        const canUpdateKeys = ['video', 'html'];
        courseCtl.updateOneSection(updateObj.courseId, updateObj.chapterId, updateObj.sectionId, _.pick(updateObj, canUpdateKeys), (err, doc) => {
            if (err) {
                return res.endError(err);
            }
            res.json(doc);
        });
    }

    /**
     * 针对richtext插件中上传图片的部分
     * @param req
     * @param res
     */
    static richtextUpload (req, res) {
        const file = req.file;
        if (file) {
            res.end(`images/${file.filename}`);
        }
    }
}

module.exports = Sa;
