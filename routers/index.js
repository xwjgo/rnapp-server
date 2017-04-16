'use strict';

const express = require('express');
const router = express.Router();
const Api = require('./api');
const Sa = require('./sa');
const Auth = require('../middlewares/auth');

/**
 * 路由总调控
 */
// 课程后台管理
router.get('/sa', Sa.renderSaPage);
// 课程资源
router.get('/api/categories', Auth.authorize, Api.getAllCategories);
router.get('/api/categories/:category_id', Auth.authorize, Api.getOneCategory);
router.get('/api/courses', Auth.authorize, Api.getAllCourses);
router.get('/api/courses/:course_id', Auth.authorize, Api.getOneCourse);
router.get('/api/categories/:category_id/courses', Auth.authorize, Api.getCoursesInOneCategory);
router.post('/api/courses', Api.createOneCourse);
router.post('/api/courses/:course_id/chapters', Api.createOneChapter);
router.post('/api/courses/:course_id/chapters/:chapter_id/sections', Api.createOneSection);
// 登陆注册
router.post('/api/users', Api.register);
router.post('/api/sessions', Api.login);
router.delete('/api/sessions', Api.logout);

module.exports = router;