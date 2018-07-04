// 秩序管理功能，提醒用户文明用语
const { messageText } = require('../tools/messageTools.js');
const ORDER_KEY = ['傻逼', '脑残', '我擦', '我靠', '我艹', 'wocao', '我草', '肏', '你个智障'];

/**
 * @description 判断是否存在脏话
 * @param {String} text 消息文本
 */
const orderState = (text) => {
    const reg = new RegExp(`/${ORDER_KEY.join('|')}/g`);
    return reg.test(text);
}

/**
 * @description 判断是否消息包含脏话，并作出警告提醒
 * @param {Message} message 消息对象
 */
const orderMessage = async (message) => {
    const text = messageText(message);
    const send = message.from();
    if (orderState(text)) {
        await message.say('请文明用语！！！', send);
    }
}

module.exports = orderMessage;