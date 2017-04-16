'use strict';
const _ = require('lodash');
const courseCtl = require('../database/controller/course');
const categoryCtl = require('../database/controller/category');
const CustomError = require('../error');
const async = require('async');


class Sa {
    static renderSaPage (req, res) {
        let nodes = [];
        async.auto({
            // 获取所有分类节点
            getCategoryNodes: (callback) => {
                categoryCtl.findAllCategories((err, docs) => {
                    if (err) {
                        return callback(err);
                    }
                    _.forEach(docs, (doc) => {
                        nodes.push({
                            id: doc._id,
                            parent: '#',
                            text: doc.category_name,
                            icon: 'iconfont icon-category'
                        });
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
                                    icon: 'iconfont icon-leaf'
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
}

module.exports = Sa;
