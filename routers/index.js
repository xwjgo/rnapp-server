'use strict';

const express = require('express');
const router = express.Router();
const Api = require('./api');

/**
 * 路由总调控
 */
router.get('/api/categories', Api.getAllCategories);
router.get('/api/categories/:category_id', Api.getOneCategory);
router.get('/api/courses', Api.getAllCourses);
router.get('/api/courses/:course_id', Api.getOneCourse);

module.exports = router;