'use strict';

const Category = require('../models/category');
/**
 * 课程分类控制器
 * @class CategoryCtl
 */
class CategoryCtl {
    /**
     * 查询所有的课程分类信息
     * @param callback
     */
    static findAllCategories (callback) {
        Category.find({}, callback);
    }

    /**
     * 根据id来查询某个课程分类
     * @param id
     * @param callback
     */
    static findCategoryById (id, callback) {
        Category.findById(id, callback);
    }
}

module.exports = CategoryCtl;