'use strict';

/**
 * 错误处理中间件
 */
class ErrorMiddleware {
    static errorHandle (req, res, next) {
        res.endError = (err) => {
            if (!err) {
                return next();
            }
            if (err.name === 'CustomError') {
                return res.status(400).json({
                    code: err.code,
                    message: err.message,
                    meta: err.meta
                });
            }
            console.error(err.stack);
            return res.sendStatus(500);
        };
        next();
    }
}

module.exports = ErrorMiddleware;