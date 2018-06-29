/**
 * 消息记录数据库模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRecordSchema = new Schema({
    send: String,
    accept: String,
    type: String,
    isGroupMsg: Boolean,
    content: String,
    date: Date,
    memtionList: [String],
});

const ChatRecordModel = mongoose.model('chatrecord', ChatRecordSchema);

module.exports = ChatRecordModel;