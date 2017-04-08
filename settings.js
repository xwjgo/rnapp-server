'use strict';

const _ = require('lodash');
const env = _.get(process.env, 'NODE_ENV', 'develop');  // 运行环境分为develop、production

const settings = {
    env: env,
    server: {
        // 主机ip
        host: '121.249.216.193',
        // 端口号
        port: 3000
    },
    db: 'mongodb://owner:cQmYgYsDsS@121.249.216.193:27017/rnapp',
    redis: {
        port: 6379,
        host: '121.249.216.193',
        family: 4,
        db: 0,
        password: 'jTwMyDtSgX'
    }
};

module.exports = settings;