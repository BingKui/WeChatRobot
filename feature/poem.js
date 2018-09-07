// 诗词歌赋
const Axios = require('axios');
const { messageText } = require('../tools/messageTools.js');

/**
 * @description 判断是否是需要诗句
 * @param {String} text 消息内容
 */
const poemState = (text) => {
    const reg = new RegExp(`/诗/g`);
    return reg.test(text);
}

/**
 * @description 获取一首随机的诗
 */
const poemOne = async () => {
    const poem = await Axios.get('https://wechat.uiseed.cn/poem');
    let result = '没有相关的诗句';
    if (poem) {
        result = poem.paragraphs.join('\n');
    }
    return result;
}

/**
 * @description 获取一首诗，发送给用户
 * @param {Message} message 消息对象
 * @return {Boolean} 返回发送是否成功
 */
const poemMessage = async (message) => {
    const text = messageText(message);
    if (poemState(text)) {
        const item = await poemOne();
        await message.say(item);
        return true;
    }
    return false;
}

module.exports = poemMessage;