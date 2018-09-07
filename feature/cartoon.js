// 歌单推荐功能
const { messageText } = require('../tools/messageTools.js');
const { randomNum } = require('../tools/tools.js');
const { cartoonData } = require('../config/data.js');

/**
 * 判断消息是否是歌单消息
 * @param {String} text 消息内容
 */
const cartoonState = (text) => {
    const reg = new RegExp(`/动漫/g`);
    return reg.test(text);
}

/**
 * 生成歌单内容
 */
const cartoonContent = () => {
    const index = randomNum(0, cartoonData.length - 1);
    const { name, address } = cartoonData[index];
    return `动漫名：${name}\n地址：${address}\n`;
}

/**
 * 生成用于分享的图片，暂定
 */
const cartoonPicture = () => {
    return '';
}

/**
 * 动漫推荐
 * @param {Message} message 消息对象
 */
const cartoonMessage = async (message) => {
    const text = messageText(message);
    if (cartoonState(text)) {
        await message.say(cartoonContent());
        return true;
    }
    return false;
}

module.exports = cartoonMessage;