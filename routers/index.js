'use strict';

const express = require('express');
const router = express.Router();
const Api = require('./api');
const Auth = require('../middlewares/auth');

/**
 * 路由总调控
 */
// 课程资源
router.get('/api/categories', Auth.authorize, Api.getAllCategories);
router.get('/api/categories/:category_id', Auth.authorize, Api.getOneCategory);
router.get('/api/courses', Auth.authorize, Api.getAllCourses);
router.get('/api/courses/:course_id', Auth.authorize, Api.getOneCourse);
// 登陆注册
router.post('/api/users', Api.register);
router.post('/api/sessions', Api.login);

module.exports = router;