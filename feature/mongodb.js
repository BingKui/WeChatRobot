// MongoDB 数据库相关操作方法
const ChatRecord = require('../model/chatrecord.js');

/**
 * @description 保存消息到数据库
 * @param {MessageRecordInfo} data 需要存入数据库的数据
 */
const saveMessage = (data) => {
    console.log('保存聊天信息：', JSON.stringify(data));
    const item = new ChatRecord(data);
    item.save((err) => {
        if (err) {
            console.log(err);
            throw(err);
        }
    });
}

module.exports = {
    saveMessage,
};