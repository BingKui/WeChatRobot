// 单聊相关功能
const assetsMessage = require('./assets.js');
const jokeMessage = require('./joke.js');
const { weatherMessage } = require('./weather.js');
const dialogMessage = require('./dialog.js')
const { groupAddAction } = require('./group.js');
const planMessage = require('./plan.js');

/**
 * @description 个人类消息处理
 * @param {Message} message Message 对象
 * @param {MessageInfo} info 消息信息
 */
const singleMessage = async (message, info) => {
    // 自己发的消息，直接返回
    if (info.isSelf) {
        return;
    }
    // 判断是否是资源类消息
    const isAssets = await assetsMessage(message);
    const isJoke = await jokeMessage(message);
    const isWeather = await weatherMessage(message);
    const isJoinGroup = await groupAddAction(message);
    const isPlan = await planMessage(message);
    if (!isAssets && !isJoke && !isWeather && !isJoinGroup && !isPlan) {
        // 不是特殊类型消息，转入对话模块
        await dialogMessage(message);
    }
}

module.exports = {
    singleMessage,
}