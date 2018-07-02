// 发送图片、壁纸、头像、文件等资源
const { randomFile } = require('../tools/assetTools.js');

/**
 * @description 头像消息
 * @param {Message} message message 对象
 */
const avatarMessage = async (message) => {
    const msgContent = randomFile('avatar', '头像');
    await message.say(msgContent);
}

/**
 * @description 图片消息
 * @param {Message} message message 对象
 */
const imageMessage = async (message) => {
    const msgContent = randomFile('image', '图片');
    await message.say(msgContent);
}

/**
 * @description 壁纸消息
 * @param {Message} message message 对象
 */
const wallpaperMessage = async (message) => {
    const msgContent = randomFile('wallpaper', 'wallpaper');
    await message.say(msgContent);
}

/**
 * @description 文档消息
 * @param {Message} message message 对象
 */
const documentMessage = async (message) => {
    const msgContent = randomFile('document', 'document');
    await message.say(msgContent);
}

/**
 * @description 配图消息
 * @param {Message} message message 对象
 */
const matchMessage = async (message) => {
    const msgContent = randomFile('match', '朋友圈配图');
    await message.say(msgContent);
}

/**
 * @description 视频消息
 * @param {Message} message message 对象
 */
const videoMessage = async (message) => {
    const msgContent = randomFile('video', '视频');
    await message.say(msgContent);
}

/**
 * @description 语音消息
 * @param {Message} message message 对象
 */
const voiceMessage = async (message) => {
    const msgContent = randomFile('voice', '语音');
    await message.say(msgContent);
}

const assetsMessage = () => {}

module.exports = {
    avatarMessage,
    imageMessage,
    wallpaperMessage,
    documentMessage,
    matchMessage,
    videoMessage,
    voiceMessage,
};
