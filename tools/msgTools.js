// 处理 msg 对象，返回当前对象以及一些必要的数据
const getMsgOptions = (m) => {

}

/**
 * @description 生成发送图片的内容
 * @param {Wechaty} bot 机器人对象
 * @param {string} imgName 图片名称，包括后缀，资源存放在 “assets/img/” 文件夹下
 * @returns {object} 通过机器人生成的内容发送的对象
 */ 
const msgImage = (bot, imgName) => {
    return new bot.Message(`${process.cwd()}/assets/img/${imgName}`);
}

/**
 * @description 获取消息的提及对象数组
 * @param {Message} msg 消息对象
 * @returns {Array} 提及用户数组
 */
const msgMention = async (msg) => {
    return await msg.mention();
}