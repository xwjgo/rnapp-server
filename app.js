'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');
const settings = require('./settings');
const routers = require('./routers');
const errorMiddleware = require('./middlewares/error');
const app = express();
const isProduction = (settings.env === 'production');

// server-favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'), {
    maxAge: 2592000000
}));
// serve静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// session
app.use(session({
    secret: 'rnapp session',
    name: 'rnapp_sid',
    saveUninitialized: false,
    resave: false,
    store: new RedisStore({
        client: new Redis(settings.redis)
    })
}));
// 日志打印
if (!isProduction) {
    app.use(morgan('tiny'));
}
// 错误处理
app.use(errorMiddleware.errorHandle);
// 路由
app.use('/', routers);
// 404页面
app.all('*', (req, res) => {
    res.sendStatus(404);
});

const port = settings.server.port;
app.listen(port, (error) => {
    if (error) {
        console.error(error.stack);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open http://localhost:${port} in your browser.`);
    }
});

