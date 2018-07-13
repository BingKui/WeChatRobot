const dayjs = require('dayjs');
const { FileBox } = require('file-box');
const { readDirData, randomNum } = require('./tools.js');

/**
 * @description 生成发送图片的内容
 * @param {Wechaty} bot 机器人对象
 * @param {String} imgName 图片名称，包括后缀，资源存放在 “assets/img/” 文件夹下
 * @returns {Object} 通过机器人生成的内容发送的对象
 */
const imgMessage = (bot, imgName) => {
    return new bot.Message(`${process.cwd()}/assets/image/${imgName}`);
}

/**
 * @description 生成替换头像的文件对象，头像放在 “assets/avatar/” 文件夹下，文件命名为（星期nubmer.jpg）
 * @param {Date} date 机器人对象
 * @returns {FileBox} 通过机器人生成的内容发送的对象
 */
const avatarImg = () => {
    const num = dayjs().day();
    return FileBox.fromFile(`${process.cwd()}/assets/avatar/${num}.jpg`, 'avatar');
}

/**
 * @description 随机获取一个目录下的一个文件
 * @param {String} foolder 文件夹名称
 * @param {String} name 随机资源类型，默认为 file，用来备注
 */
const randomFile = (foolder) => {
    const path = `${process.cwd()}/assets/${foolder}`;
    const pathData = readDirData(path);
    let result = '暂时没有相关资源！';
    if (pathData.length > 0) {
        const filename = pathData[randomNum(0, pathData.length - 1)];
        result = FileBox.fromFile(`${path}/${filename}`);
    }
    return result;
}

/**
 * @description 通过 url 生成远程资源文件
 * @param {String} url 资源文件地址
 * @returns {FileBox} 返回 FileBox 文件对象，可以直接用于发送
 */
const remoteFile = (url) => {
    const result = FileBox.fromUrl(url);
    return result;
}

/**
 * @description 根据消息内容返回相应的资源目录，如果都不匹配返回 false
 * @param {String} text 消息内容
 */
const assetFolder = (text) => {
    switch (text) {
        case '头像':
            return 'avatar';
        case '图片':
            return 'image';
        case '壁纸':
            return 'wallpaper';
        case '文档':
            return 'document';
        case '朋友圈配图':
            return 'match';
        case '视频':
            return 'video';
        case '语音':
            return 'voice';
        default:
            return false;
    }
}

module.exports = {
    imgMessage,
    avatarImg,
    randomFile,
    remoteFile,
    assetFolder,
};