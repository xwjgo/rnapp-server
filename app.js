'use strict';

const _ = require('lodash');
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
const socketIo = require('socket.io');
const http = require('http').Server(app);
const io = socketIo(http);
const isProduction = (settings.env === 'production');

// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// server-favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'), {
    maxAge: 2592000000
}));
// serve静态资源
app.use(express.static(path.join(__dirname, 'public')));
// 获取静态资源路径
_.extend(app.locals, {
    staticFile: (filePath) => `${filePath}`
});

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
if (isProduction) {
    app.use(morgan(':remote-addr :method :url :status :res[content-length] :response-time ms - :date'));
} else {
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
http.listen(port, (error) => {
    if (error) {
        console.error(error.stack);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open http://localhost:${port} in your browser.`);
    }
});

// socket.io
io.on('connection', (socket) => {
    const {username, room_id} = socket.handshake.query;
    socket.join(room_id);

    // 更新人数
    io.in(room_id).clients((error, clients) => {
        io.in(room_id).emit('new-number', clients.length);
    });

    // 连接后，发射join
    io.in(room_id).emit('join', {username, type: 'join'});
    console.log(`${username} joined the room ${room_id} ...`);

    // 收到消息，发射chat-message
    socket.on('chat-message', (message) => {
        io.in(room_id).emit('chat-message', {
            username,
            message,
            type: 'chat-message'
        });
    });

    // 断开连接，发射leave
    socket.on('disconnect', () => {
        io.in(room_id).emit('leave', {username, type: 'leave'});
        socket.leave(room_id);
        console.log(`${username} leaved the room ${room_id} ...`);
        // 更新人数
        io.in(room_id).clients((error, clients) => {
            io.in(room_id).emit('new-number', clients.length);
        });
    });
});
