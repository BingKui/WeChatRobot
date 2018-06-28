const {
    contactInfo,
} = require('./contactTools.js');
/**
 * @description 处理 message 对象，返回对象的基本信息和数据
 * @param {Message} message 
 */
const messageInfo = async (message) => {
    if (!message) {
        return null;
    }
    const fromContact = message.from();
    const toContact = message.to();
    return {
        isSelf: message.self(), // 是否是自己发的消息
        fromContact, // 发送者
        fromContactInfo: await contactInfo(fromContact), // 发送者用户信息
        toCantact, // 接收者，在 room 中返回 null
        toCantactInfo: await contactInfo(toContact), // 接收者用户信息，在 room 中返回 null
    };
}

/**
 * @description 返回消息的类型
 * @param {Message} message 消息对象
 * @return {MessageType: string} 返回消息类型描述
 */
const messageType = (message) => {
    const msgType = message.type();
    const msgTypeEnum = [0, 'Attachment', 'Audio', 'Contact', 'Emoticon', 'Image', 'Text', 'Video'];
    const msgTypeResult = ['未知', '附件', '语音', '联系人名片', '表情', '图片', '文本', '视频'];
    return '';
}

/**
 * @description 获取消息的提及对象数组
 * @param {Message} msg 消息对象
 * @returns {Array} 提及用户数组
 */
const msgMention = async (msg) => {
    return await msg.mention();
}