// 计划任务，在计划任务时间回复特定消息

const { messageText, messageInfo } = require('../tools/messageTools.js');
const { robotSuffix, robotTipMessage } = require('../config/config.js');
const { plans } = require('../config/plan.js');

/**
 * 处理消息，返回是否在计划内和计划内的回复消息
 * @param {Date} date 
 */
const planState = (date) => {
    let flag = false;
    let result = '';
    for (let i = 0; i < plans.length; i++) {
        const { startTime, endTime, message } = plans[i];
        if (dealTime(date, startTime, endTime)) {
            result = message;
            flag = true;
            break;
        }
    }
    return {
        flag,
        result,
    };
}

const dealTime = (date, start, end) => {
    const time = new Date(date);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const flag_one = hour >= start.hour && minute >= start.minute;
    const flag_two = hour <= end.hour && minute <= end.minute;
    if (flag_one && flag_two) {
        return true;
    }
    return false;
}

/**
 * 计划任务
 * @param {Message} message 消息对象
 * @return {Boolean} 返回发送是否成功
 */
const planMessage = async (message) => {
    const { date } = await messageInfo(message);
    const { flag, result } = planState(date);
    if (flag) {
        await message.say(robotTipMessage);
        await message.say(`${robotSuffix}：${result}`);
        return true;
    }
    return false;
}

module.exports = planMessage;