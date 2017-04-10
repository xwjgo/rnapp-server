'use strict';

const CustomError = require('../error');
/**
 * 用户授权中间件
 */
class AuthMiddleware {
    static authorize (req, res, next) {
        if (req.session && req.session.user) {
            return next();
        } else {
            return res.endError(new CustomError({code: 1004, httpCode: 401}));
        }
    }
}

module.exports = AuthMiddleware;