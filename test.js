const qs = require('querystring');
const axios = require('axios');
const fs = require('fs');
var dayjs = require('dayjs');
const {
    baiduApiKey,
    baiduSecretKey
} = require('./config.js');

const url = 'https://aip.baidubce.com/oauth/2.0/token';
const param = qs.stringify({
    grant_type: 'client_credentials',
    client_id: baiduApiKey,
    client_secret: baiduSecretKey
});
const { accessToken } = require('./token/accessToken');
console.log('改变之前的Accesstoken为：', accessToken);
axios.post(`${url}?${param}`).then((response) => {
    // console.log(response.data);
    const _res = response.data;
    const days = _res.expires_in / 3600 / 24;
    const now = dayjs();
    const indate = now.add(days, 'day').format('YYYY-MM-DD');
    // console.log(indate);
    const content = `module.exports = {
        accessToken: '${_res.access_token}',
        indate: '${indate}'
    }`;
    // console.log('内容：', content)
    fs.writeFile('token/accessToken.js', content, 'utf-8', (err) => {
        if (err) throw err;
        const aaa = require('./token/accessToken');
        console.log('目前的Accesstoken为：', aaa.accessToken);
    });
}).catch((err) => {
    console.log(err);
})

// console.log(dayjs());
