'use strict';
const _ = require('lodash');
const Constants = require('./constants');

/**
 * 自定义错误类
 * @class CustomError
 * @extends Error
 */
class CustomError extends Error {
    constructor (options) {
        super();
        const defaultConfig = {
            code: 1,
            message: _.get(Constants.ERR_CODE, _.get(options, 'code', 1)),
            httpCode: 400,
            meta: null
        };
        _.defaults(options, defaultConfig);
        _.extend(this, _.pick(options, _.keys(defaultConfig)));
    }

    get name () {
        return this.constructor.name;
    }
}

module.exports = CustomError;