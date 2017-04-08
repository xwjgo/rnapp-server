'use strict';

/**
 * 用户授权中间件
 */
class AuthMiddleware {
    static authorize (req, res, next) {
        if (req.session && req.session.user) {
            return next();
        } else {
            return res.status(401).json({error: '用户未登录'});
        }
    }
}

module.exports = AuthMiddleware;