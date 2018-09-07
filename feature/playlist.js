// 歌单推荐功能
const { messageText } = require('../tools/messageTools.js');

const { playlist } = require('../config/data.js');

/**
 * 判断消息是否是歌单消息
 * @param {String} text 消息内容
 */
const playlistState = (text) => {
    const reg = new RegExp(`/歌单/g`);
    return reg.test(text);
}

/**
 * 生成歌单内容
 */
const palylistContent = () => {
    const { name, address, from } = playlist[0];
    const source = {
        qq: 'QQ音乐',
        netease: '网易云音乐',
    };
    return `歌单名：${name}\n地址：${address}\n来源：${source[from]}`;
}

/**
 * 生成用于分享的图片，暂定
 */
const playlistPicture = () => {
    return '';
}

/**
 * 歌单推荐
 * @param {Message} message 消息对象
 */
const playlistMessage = async (message) => {
    const text = messageText(message);
    if (playlistState(text)) {
        await message.say(palylistContent());
        return true;
    }
    return false;
}

module.exports = playlistMessage;