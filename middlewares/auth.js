/**
 * 用户授权中间件
 */
class AuthMiddleware {
    static authorize (req, res, next) {
        if (req.session && req.session.user) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    }
}

module.exports = AuthMiddleware;