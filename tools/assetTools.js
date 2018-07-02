const dayjs = require('dayjs');
const FileBox = require('file-box');
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
    return FileBox.fromLocal(`${process.cwd()}/assets/avatar/${num}.jpg`, 'avatar');
}

/**
 * @description 随机获取一个目录下的一个文件
 * @param {String} foolder 文件夹名称
 * @param {String} name 随机资源类型，默认为 file，用来备注
 */
const randomFile = (foolder, name = 'file') => {
    const path = `${process.cwd()}/assets/${foolder}`;
    const pathData = readDirData(path);
    const filename = pathData[randomNum(0, pathData.length - 1)];
    return FileBox.fromLocal(`${path}/${filename}`, name);
}

const avatarFile = () => {}

module.export = {
    imgMessage,
    avatarImg,
    randomFile,
};