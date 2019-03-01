// 诗词歌赋
const Axios = require('axios');
const { messageText } = require('../tools/messageTools.js');

/**
 * @description 判断是否是需要诗句
 * @param {String} text 消息内容
 */
const poemState = (text) => {
    const reg = /诗/g;
    console.log('是否是诗句：', reg.test(text));
    return reg.test(text);
}

/**
 * @description 获取一首随机的诗
 */
const poemOne = async () => {
    const res = await Axios.get('https://wechat.uiseed.cn/poem');
    console.log('返回结果为：', res.data);
    const poem = res.data.poem;
    let result = '没有相关的诗句';
    if (poem) {
        console.log('获取到的诗为：', poem);
        result = `${poem.title}-${poem.author}\n${poem.paragraphs.join('\n')}`;
    }
    return result;
}

/**
 * @description 获取一首诗，发送给用户
 * @param {Message} message 消息对象
 * @return {Boolean} 返回发送是否成功
 */
const poemMessage = async (message) => {
    const text = messageText(message);
    if (/诗/g.test(text)) {
        const item = await poemOne();
        await message.say(item);
        return true;
    }
    return false;
}

module.exports = poemMessage;