// 笑话相关功能
const Axios = require('axios');
const { jokeUrl } = require('../tools/url.js');
const { jokeKey } = require('../tools/config.js');

/**
 * @description 获取一个笑话
 * @return {string} 返回一个笑话的内容
 */
const getJoke = async () => {
    const res = await Axios.get(`${jokeUrl}${jokeKey}`);
    let result = '获取笑话失败！';
    if (res) {
        result = res.data.result[2].content;
    }
    return result;
}

module.exports = {
    getJoke,
};