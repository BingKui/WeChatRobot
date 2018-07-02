// 发送图片、壁纸、头像、文件等资源
const { randomFile, assetFolder } = require('../tools/assetTools.js');
const { messageText } = require('../tools/messageTools.js');

/**
 * @description 头像消息，弃用，使用 assetMessage 代替
 * @param {Message} message message 对象
 */
const avatarMessage = async (message) => {
    const msgContent = randomFile('avatar', '头像');
    await message.say(msgContent);
}

/**
 * @description 图片消息，弃用，使用 assetMessage 代替
 * @param {Message} message message 对象
 */
const imageMessage = async (message) => {
    const msgContent = randomFile('image', '图片');
    await message.say(msgContent);
}

/**
 * @description 壁纸消息，弃用，使用 assetMessage 代替
 * @param {Message} message message 对象
 */
const wallpaperMessage = async (message) => {
    const msgContent = randomFile('wallpaper', '壁纸');
    await message.say(msgContent);
}

/**
 * @description 文档消息，弃用，使用 assetMessage 代替
 * @param {Message} message message 对象
 */
const documentMessage = async (message) => {
    const msgContent = randomFile('document', '文档');
    await message.say(msgContent);
}

/**
 * @description 配图消息，弃用，使用 assetMessage 代替
 * @param {Message} message message 对象
 */
const matchMessage = async (message) => {
    const msgContent = randomFile('match', '朋友圈配图');
    await message.say(msgContent);
}

/**
 * @description 视频消息，弃用，使用 assetMessage 代替
 * @param {Message} message message 对象
 */
const videoMessage = async (message) => {
    const msgContent = randomFile('video', '视频');
    await message.say(msgContent);
}

/**
 * @description 语音消息，弃用，使用 assetMessage 代替
 * @param {Message} message message 对象
 */
const voiceMessage = async (message) => {
    const msgContent = randomFile('voice', '语音');
    await message.say(msgContent);
}

/**
 * @description 资源类消息
 * @param {Message} message message 对象
 * @return {Boolean} 返回是否是资源消息，不是资源类消息，返回 false
 */
const assetsMessage = async (message) => {
    const text = messageText(message);
    const type = assetFolder(text);
    if (type) {
        const msgContent = randomFile(type);
        await message.say(msgContent);
        return true;
    }
    return false;
}

module.exports = assetsMessage;
