const LinkUrl = require('./url');
const { accessToken } = require('./token/accessToken');
const axios = require('axios');
const iconv = require('iconv-lite')
const param = {
    "text": "康兵奎"
};
// axios.post(`${LinkUrl.grammarAnalyze}?access_token=${accessToken}`, param).then((res) => {
//     console.log(res.data);
// }).catch((err) => {
//     console.log(err);
// })

// console.log(iconv.encode(JSON.stringify(param), 'GBK'));
const _data = iconv.encode(JSON.stringify(param), 'GBK');
axios({
    method: "post",
    url: `${LinkUrl.grammarAnalyze}?access_token=${accessToken}`,
    headers:{
        'Content-type': 'application/json'
    },
    data: _data
}).then((res) => {
    console.log('内容：', JSON.stringify(res.data));
    const buffer = new Buffer(JSON.stringify(res.data));
    // let buffer = new Buffer(res.data);
    let decodedBody = iconv.decode(buffer, 'GBK', {
        defaultEncoding: 'GBK'
    });
    console.log(decodedBody);
}).catch((err) => {
    console.log(err);
})

// console.log(encodeGBK('康兵奎'));
// console.log(decodeGBK('%BF%B5%B1%F8%BF%FC'));

// const NLP = require('./aip-node-sdk-2.1.1/src/index').nlp;
// console.log(NLP)
// // 调用词法分析
// NLP.lexer('康兵奎').then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });