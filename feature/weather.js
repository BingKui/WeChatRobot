// 天气相关功能方法
const Schedule = require('node-schedule');
const Pinyin = require('pinyin');
const Axios = require('axios');
const { weatherUrl } = require('../config/url');
const { weatherAPIKey } = require('../config/config.js');
const { messageText } = require('../tools/messageTools.js');

/**
 * @description 定时任务，推送天气
 * @param {Contact} contact 开启推送的用户
 * @param {string} city 需要推送的城市名称
 */
const weatherAutoPush = (contact, city) => {
    Schedule.scheduleJob('0 30 9 * * *', async () => {
        // 推送天气
        const weatherInfo = await weatherInfo(city);
        const msg = weatherText(weatherInfo);
        await contact.say(msg);
    });
}

/**
 * @description 生成天气消息
 * @param {Message} message 消息对象
 * @return {Boolean} 消息发送成功与否
 */
const weatherMessage = async (message) => {
    const text = messageText(message);
    if (text.indexOf('天气') > -1) {
        const city = weatherCity(text);
        console.log('得到的城市为：', city);
        const info = await weatherInfo(city);
        if (info.noInfo) {
            await message.say(info.tip);
        } else {
            await message.say(weatherText(info));
        }
        return true;
    }
    return false;
}

const weatherText = (info) => {
    let msgText = '';
    if (!info) {
        msgText = '目前还不知道天气怎样！';
    }
    msgText = `${info.city}\n天气：${info.weather}\n气温：${info.temperature}℃\n发布时间：${info.date}`;
    return msgText;
}

/**
 * 
 * @param {String} text 消息文本内容
 * @return {String} 返回城市名称
 * @TODO 增加百度的语法分析，准确获取城市
 */
const weatherCity = (text) => {
    // 默认天气城市为：杭州
    return text.split('的')[0] || '杭州';
}

/**
 * @description 获取某个天气信息
 * @param {String} city 需要获取天气信息的城市名称
 * @return {Object} 基本天气信息
 */
const weatherInfo = async (city) => {
    const _city = Pinyin(city, { style: Pinyin['STYLE_NORMAL'] }).join('');
    const res = await Axios.get(`${weatherUrl}&key=${weatherAPIKey}&location=${_city}`);
    console.log(JSON.stringify(res.data));
    let result = null;
    if (res) {
        const data = res.data.results[0].now;
        const time = res.data.results[0].last_update;
        result = {
            city,
            weather: data.text,
            temperature: data.temperature,
            date: (new Date(time)).toLocaleString(),
        };
    } else {
        console.log('获取天气失败');
        result = {
            noInfo: true,
            tip: `未查询到${city}的天气信息，换个城市试试~~`,
        };
    }
    return result;
}

module.exports = {
    weatherInfo,
    weatherAutoPush,
    weatherMessage,
};