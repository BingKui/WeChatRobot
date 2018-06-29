const mongoose = require('mongoose');
const { mongoDB } = require('./config');

// 链接数据库
mongoose.connect(mongoDB);

// 监听数据库事件
const db = mongoose.connection;

/**
 * 连接异常
 */
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
db.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

/**
 * 连接成功
 */
db.on('connected', function () {
    console.log('Mongoose connection open to ' + mongoDB);
});