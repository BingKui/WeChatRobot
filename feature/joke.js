// 笑话相关功能
const Axios = require('axios');
const { FileBox } = require('file-box');
const { jokeUrl } = require('../config/url');
const { jokeKey } = require('../config/config.js');
const { messageText } = require('../tools/messageTools.js');

/**
 * @description 获取一个笑话，与其对应的图片
 * @return {string} 返回一个笑话的内容
 */
const jokeInfo = async () => {
    const res = await Axios.get(`${jokeUrl}${jokeKey}`);
    let result = [];
    console.log('获取到的笑话为：', res.data.result);
    if (res) {
        result.push(res.data.result[3].content);
        result.push(FileBox.fromUrl(res.data.result[3].url));
    } else {
        result.push('没什么笑话！');
        const path = `${process.cwd()}/assets/emoji`;
        result.push(FileBox.fromFile(`${path}/dog.jpeg`));
    }
    return result;
}

/**
 * @description 发送笑话信息
 * @param {Message} message 消息对象
 */
const jokeMessage = async (message) => {
    const text = messageText(message);
    if (text.indexOf('笑话') > -1) {
        const joke = await jokeInfo();
        await message.say(joke[0]);
        await message.say(joke[1]);
        return true;
    }
    return false;
}

module.exports = jokeMessage;