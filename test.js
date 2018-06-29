// const qs = require('querystring');
// const axios = require('axios');
// const fs = require('fs');
// const {
//     baiduApiKey,
//     baiduSecretKey
// } = require('./config.js');

// const url = 'https://aip.baidubce.com/oauth/2.0/token';
// const param = qs.stringify({
//     grant_type: 'client_credentials',
//     client_id: baiduApiKey,
//     client_secret: baiduSecretKey
// });
// const { accessToken } = require('./token/accessToken');
// console.log('改变之前的Accesstoken为：', accessToken);
// axios.post(`${url}?${param}`).then((response) => {
//     // console.log(response.data);
//     const _res = response.data;
//     const days = _res.expires_in / 3600 / 24;
//     const now = dayjs();
//     const indate = now.add(days, 'day').valueOf();
//     // console.log(indate);
//     const content = `module.exports = {
//         accessToken: '${_res.access_token}',
//         indate: '${indate}'
//     }`;
//     // console.log('内容：', content)
//     fs.writeFile('token/accessToken.js', content, 'utf-8', (err) => {
//         if (err) throw err;
//         const aaa = require('./token/accessToken');
//         console.log('目前的Accesstoken为：', aaa.accessToken);
//     });
// }).catch((err) => {
//     console.log(err);
// })

// console.log(dayjs());

// const now = dayjs();
// console.log(now.valueOf())
// const indate = (now.add(30, 'day')).valueOf();
// console.log(indate - now.valueOf())

const schedule = require('node-schedule');
const dayjs = require('dayjs');
// 定时任务测试
const testSchedule = () => {
    schedule.scheduleJob('* * * * * *', function() {
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
        console.log(now);
    });
    schedule.scheduleJob('* * * * * *', function() {
        console.log('dishiqi ');
    });
}

testSchedule();