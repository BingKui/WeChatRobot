// 正常流程对话模块
// v0.2.* 先接入聚合数据的问答模式，后续大家自己的服务，改为自己的服务
const Axios = require('axios');
const { qAndAUrl } = require('../config/url.js');
const { qAndAKey } = require('../config/config.js');
const { messageText } = require('../tools/messageTools.js');

/**
 * @description 根据问题得到答案
 * @param {String} question 问题内容
 */
const dialogAnswer = async (question) => {
    const url = encodeURI(`${qAndAUrl}?&info=${question}dtype=json&loc=&userid=&key=${qAndAKey}`);
    const result = await Axios.get(url);
    if (result) {
        return result.data.result.text;
    }
    return '这个问题有点难，难倒我了';
}

/**
 * @description 发送消息
 * @param {Message} message 消息对象
 */
const dialogMessage = async (message) => {
    const question = messageText(message);
    const answer = await dialogAnswer(question);
    await message.say(answer);
}

module.exports = dialogMessage;