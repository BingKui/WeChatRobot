// 天气相关功能方法
const Schedule = require('node-schedule');
const Pinyin = require('pinyin');
const Axios = require('axios');
const { weatherUrl } = require('../tools/url.js');
const { weatherAPIKey } = require('../tools/config.js');

/**
 * @description 定时任务，推送天气
 * @param {Contact} contact 开启推送的用户
 * @param {string} city 需要推送的城市名称
 */
const pushWeather = (contact, city) => {
    Schedule.scheduleJob('0 30 9 * * *', async () => {
        // 推送天气
        const weatherInfo = await getWeather(city);
        const msg = createWeatherMsg(weatherInfo);
        await contact.say(msg);
    });
}

/**
 * @description 生成天气消息
 * @param {WeatherInfo} info 天气信息对象
 * @return {string} 返回天气消息字符串
 */
const createWeatherMsg = (info) => {
    if (!info) {
        return '获取天气失败';
    }
    return `${info.city}\n天气：${info.weather}\n气温：${info.temperature}℃\n发布时间：${info.date}`;
}

/**
 * @description 获取某个天气信息
 * @param {string} city 需要获取天气信息的城市名称
 * @return {object} 基本天气信息
 */
const getWeather = async (city) => {
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
    }
    return result;
}

// test
// pushWeather(null, '杭州');

module.exports = {
    getWeather,
    pushWeather,
    createWeatherMsg,
};