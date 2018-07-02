// 笑话相关功能
const Axios = require('axios');
const { jokeUrl } = require('../tools/url.js');
const { jokeKey } = require('../tools/config.js');

/**
 * @description 获取一个笑话
 * @return {string} 返回一个笑话的内容
 */
const jokeInfo = async () => {
    const res = await Axios.get(`${jokeUrl}${jokeKey}`);
    let result = '没什么笑话！';
    if (res) {
        result = res.data.result[2].content;
    }
    return result;
}

/**
 * @description 发送笑话信息
 * @param {Message} message 消息对象
 */
const jokeMessage = (message) => {
    const joke = jokeInfo();
    await message.say(joke);
}

module.exports = jokeMessage;