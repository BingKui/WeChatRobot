const fs = require('fs');
const axios = require('axios');
const pinyin = require("pinyin");
const qs = require('querystring')
const { weatherAPIKey, baiduApiKey, baiduSecretKey, jokeKey, qAndAKey } = require('./config');
const LinkUrl = require('./url');

const logger = (...args) => {
    console.log(args);
}

const bindKnowledgeAnswer = (m, content, key, answer, cb) => {
    if (content.indexOf(key) > -1) {
        m.say(`${answer}`);
        cb && cb();
    }
}

// 保存聊天记录
const saveChatInfo = (groupName, str) => {
    const _date = new Date().toLocaleDateString().replace(/\//g, '-');
    fs.appendFile(`temp/${groupName}-${_date}.txt`, str + '\n', 'utf8', (err) => {
        if (err) saveChatInfo(groupName, str);
        console.log('聊天记录已存储...');
    })
}
// 保存登录信息
const saveLoginInfo = (info) => {
    fs.appendFile(`log/login.txt`, info + '\n', 'utf8', (err) => {
        if (err) saveLoginInfo(info);
        console.log('登录信息已记录...');
    })
}

// 判断是否是 @ 机器人
const checkAtRobot = (username, content) => {
    let flag = false;
    const isAt = /\@/g.test(content);
    if (isAt) {
        const _space = returnSpace(content);
        const _username = (content.split('@')[1]).split(_space)[0];
        if (username === _username) {
            flag = true;
        }
    }
    return flag;
}

const returnSpace = (con) => {
    const _str = con.split('@')[1];
    return _str.indexOf(' ') > -1 ? ' ' : ' ';
}

const randomNum = (n) => {
    let _num = '';
    for (let i = 0; i < n; i++) {
        _num += Math.floor(Math.random() * 10) + '';
    }
    return Math.floor(_num);
}

// const getWeather = (city, callback) => {
//     const _city = pinyin(city, {
//             style: pinyin['STYLE_NORMAL']
//         }).join('');
//     axios.get(`${LinkUrl.weatherUrl}&key=${weatherAPIKey}&location=${_city}`)
//         .then(function (response) {
//             const data = response.data.results[0].now;
//             const time = response.data.results[0].last_update;
//             const _return = {
//                 weather: data.text,
//                 temperature: data.temperature,
//                 date: (new Date(time)).toLocaleString()
//             };
//             callback && callback(_return);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// const getJoke = (callback) => {
//     axios.get(`${LinkUrl.jokeUrl}${jokeKey}`)
//     .then(function (response) {
//         const _data = response.data.result[2].content;
//         callback && callback(_data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// }

const questionAndAnswer = (question, callback) => {
    const _url = encodeURI(`${LinkUrl.qAndAUrl}?&info=${question}dtype=json&loc=&userid=&key=${qAndAKey}`);
    axios.get(_url).then(function (response) {
        const _data = response.data.result.text;
        callback && callback(_data);
    }).catch(function (error) {
        console.log(error);
    });

}
// 获取百度AI的 AccessToken，如果失效则重新获取
const getBaiduAccessToken = (callback) => {
    const { accessToken, indate } = require('./token/accessToken');
    const now = dayjs();
    const _falg = now.valueOf < indate;
    if (accessToken && _falg) {
        callback && callback(accessToken);
    } else {
        const param = qs.stringify({
            grant_type: 'client_credentials',
            client_id: baiduApiKey,
            client_secret: baiduSecretKey
        });
        axios.post(`${LinkUrl.accessTokenUrl}?${param}`).then((response) => {
            const _res = response.data;
            callback && callback(_res.access_token);
            const _days = _res.expires_in / 3600 / 24;
            const _indate = now.add(_days, 'day').valueOf();
            const content = `module.exports = {
                accessToken: '${_res.access_token}',
                indate: ${_indate}
            }`;
            fs.writeFile('token/accessToken.js', content, 'utf-8', (err) => {
                if (err) throw err;
                console.log('新AccessToken已保存。');
            });
        }).catch((err) => {
            console.log(err);
        })
    }
}

module.exports = {
    logger,
    bindKnowledgeAnswer,
    saveChatInfo,
    randomNum,
    saveLoginInfo,
    checkAtRobot,
    getWeather,
    getJoke,
    questionAndAnswer,
    returnSpace,
    getBaiduAccessToken
}