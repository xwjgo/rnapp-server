'use strict';
/**
 * 一些常量
 * @type {Object}
 */
const Constants = {
    /**
     * 错误码
     */
    ERR_CODE: {
        // 默认
        1: '错误的请求',
        // 用户
        1000: '该用户名不存在',
        1001: '密码不正确',
        1002: '该用户名已经被注册',
        1003: 'url中id类型不正确',
        1004: '用户未登陆',
        // 课程
        2000: '未找到符合条件的文档'
    }
};

module.exports = Constants;