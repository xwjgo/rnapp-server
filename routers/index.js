'use strict';

const multer = require('multer');
const express = require('express');
const router = express.Router();
const Api = require('./api');
const Sa = require('./sa');
const Auth = require('../middlewares/auth');

// multer上传配置
const uploader = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.url === '/upload/images' || req.url === '/upload/richtext') {
            cb(null, 'public/images');
        }
        if (req.url === '/upload/videos') {
            cb(null, 'public/videos')
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${+new Date()}.${file.originalname}`);
    }
}), fileFilter: (req, file, cb) => {
    const checkImageUpload = req.url === '/upload/images' && /^image\//.test(file.mimetype);
    const checkRichtextUpload = req.url === '/upload/richtext' && /^image\//.test(file.mimetype);
    const checkVideoUpload = req.url === '/upload/videos' && /^video\//.test(file.mimetype);
    if (checkImageUpload || checkVideoUpload || checkRichtextUpload) {
        return cb(null, true);
    }
    cb(null, false);
}});
/**
 * 路由总调控
 */
// 课程后台管理
router.get('/sa/login', Sa.renderLoginPage);
router.get('/sa', Auth.authorize, Sa.renderSaPage);
router.post('/upload/images', Auth.authorize, uploader.single('picture'), Sa.imageUpload);
router.post('/upload/videos', Auth.authorize, uploader.single('video'), Sa.videoUpload);
router.post('/upload/richtext', Auth.authorize, uploader.single('richtextImage'), Sa.richtextUpload);
// 课程资源
router.get('/api/categories', Auth.authorize, Api.getAllCategories);
router.get('/api/categories/:category_id', Auth.authorize, Api.getOneCategory);
router.get('/api/courses', Auth.authorize, Api.getAllCourses);
router.get('/api/courses/:course_id', Auth.authorize, Api.getOneCourse);
router.get('/api/categories/:category_id/courses', Auth.authorize, Api.getCoursesInOneCategory);
router.post('/api/courses', Auth.authorize, Api.createOneCourse);
router.post('/api/courses/:course_id/chapters', Auth.authorize, Api.createOneChapter);
router.post('/api/courses/:course_id/chapters/:chapter_id/sections', Auth.authorize, Api.createOneSection);
router.put('/api/courses/:course_id', Auth.authorize, Api.updateOneCourse);
router.put('/api/courses/:course_id/chapters/:chapter_id', Auth.authorize, Api.updateOneChapter);
router.put('/api/courses/:course_id/chapters/:chapter_id/sections/:section_id', Auth.authorize, Api.updateOneSection);
router.delete('/api/courses/:course_id', Auth.authorize, Api.deleteOneCourse);
router.delete('/api/courses/:course_id/chapters/:chapter_id', Auth.authorize, Api.deleteOneChapter);
router.delete('/api/courses/:course_id/chapters/:chapter_id/sections/:section_id', Auth.authorize, Api.deleteOneSection);
// 评论和评分
router.get('/api/comments', Auth.authorize, Api.getCommentsByQuery);
router.get('/api/scores', Auth.authorize, Api.getScoresByQuery);
router.post('/api/comments', Auth.authorize, Api.createOneComment);
router.post('/api/scores', Auth.authorize, Api.createOneScore);
// 登陆注册
router.post('/api/users', Api.register);
router.post('/api/sessions', Api.login);
router.delete('/api/sessions', Auth.authorize, Api.logout);
// 用户信息
router.post('/api/users/:user_id/likes', Auth.authorize, Api.addOneLike);
router.delete('/api/users/:user_id/likes', Auth.authorize, Api.deleteOneLike);

module.exports = router;