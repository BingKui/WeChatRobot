// 定时任务，修改用户头像
const schedule = require('node-schedule');
const { avatarImg } = require('../tools/assetTools.js');

/**
 * @description 定时每天的 00：01：00 执行修改头像的任务
 * @param {Contact} contact 登录的用户对象
 */
const avatarAutoChange = (contact) => {
    schedule.scheduleJob('0 1 0 * * *', async () => {
        const avatarFile = avatarImg();
        try {
            await contact.avatar(avatarFile);
        } catch (err) {
            console.log('修改头像失败');
        }
    });
}

module.exports = avatarAutoChange;