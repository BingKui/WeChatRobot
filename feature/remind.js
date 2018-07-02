// 提醒相关方法，根据当前时间，提醒用户休息
const dayjs = require('dayjs');

// 配置数据
const {
    remindNoonBreakHour,
    remindNoonBreakData,
    remindSleepHour,
    remindSleepData, 
} = require('../config/remind.js');

/**
 * @description 提醒用户午休，时间段 12：00-14：00
 */
const remindNoonBreak = (index) => {
    return remindNoonBreakData[index];
}

/**
 * @description 提醒用户睡觉，时间段：00：00-7：00
 */
const remindSleep = (index) => {
    return remindSleepData[index];
}

/**
 * @description 提醒消息判断，是否需要发送提醒
 * @param {Message} message message 对象
 */
const remindMessage = async (message) => {
    const hour = dayjs().hour();
    const indexOne = remindNoonBreakHour.indexOf(hour);
    const indexTwo = remindSleepHour.indexOf(hour);
    if (indexOne > -1) {
        const msgText = remindNoonBreak(indexOne);
        await message.say(msgText);
    }
    if (indexTwo > -1) {
        const msgText = remindSleep(indexTwo)
        await message.say(msgText);
    }
}

module.exports = remindMessage;