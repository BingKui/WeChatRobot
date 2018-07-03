// 单聊相关功能
const assetsMessage = require('./assets.js');
const jokeMessage = require('./joke.js');
const weatherMessage = require('./weather.js');
/**
 * 
 * @param {Message} message Message 对象
 * @param {MessageInfo} info 消息信息
 */
const singleMessage = (message, info) => {
    // 自己发的消息，直接返回
    if (info.isSelf) {
        return;
    }
    // 判断是否是资源类消息
    const isAssets = await assetsMessage(message);
    const isJoke = await jokeMessage(message);
    const isWeather = await weatherMessage(message);
    if (!isAssets && !isJoke && !isWeather) {}
    if (!await assetsMessage(message)) {
        // 处理信息，进行回复

    }
}

module.exports = {
    singleMessage,
}