const { formatDate } = require('./tools.js');
const { contactInfo } = require('./contactTools.js');
const { roomInfo } = require('./roomTools.js');
/**
 * @description 处理 message 对象，返回对象的基本信息和数据
 * @param {Message} message 
 */
const messageInfo = async (message) => {
    if (!message) {
        return null;
    }
    const send = message.from();
    const accept = message.to();
    const mention = await message.mention();
    const room = message.room();
    return {
        isSelf: message.self(), // 是否是自己发的消息
        send, // 发送者
        sendInfo: await contactInfo(send), // 发送者用户信息
        accept, // 接收者，在 room 中返回 null
        acceptInfo: await contactInfo(accept), // 接收者用户信息，在 room 中返回 null
        room, // 群聊房间
        roomInfo: await roomInfo(room), // 群聊房间信息
        type: messageType(message), // 消息类型
        content: messageText(message), // 消息内容
        mention, // 提及用户 list
        mentionInfo: contactListInfo(mention) || [], // 提及用户信息
        date: formatDate(message.date()), // 消息发送时间
        age: message.age(), // 消息的年龄，据当前时间的秒数
    };
}

/**
 * @description 处理并返回消息内容
 * @param {Message} message message 对象
 * @return {String} 返回处理过的消息内容
 */
const messageText = (message) => {
    if (message) {
        const text = message.text();
        return text ? text.replace(/\s+/g, '') : '';
    }
    return '';
}

/**
 * @description 返回用于保存的简要数据对象
 * @param {Message} message 消息对象
 * @return {Object} 用于保存到数据库的对象
 */
const messageRecord = async (message) => {
    const info = await messageInfo(message);
    return messageRecordInfo(info);
}

/**
 * @description 返回用于保存的简要数据对象
 * @param {MessageInfo} info 消息内容
 * @return {Object} 用于保存到数据库的对象
 */
const messageRecordInfo = (info) => {
    const mentionList = info.mentionInfo.map(item => item.name);
    const accept = info.room ? info.roomInfo.name : info.acceptInfo.name;
    return {
        send: info.sendInfo.name, //发送人名字
        accept, // 接收者，可能是人名或者群名
        type: info.type, // 消息的类型
        isGroupMsg: info.room !== null, // 是否是群消息
        content: info.content, // 内容
        date: info.date, // 时间
        mentionList, // 提到的人
    };
}

/**
 * @description 返回消息的类型
 * @param {Message} message 消息对象
 * @return {MessageType: String} 返回消息类型描述
 */
const messageType = (message) => {
    const msgType = message.type();
    const msgTypeEnum = [0, 'Attachment', 'Audio', 'Contact', 'Emoticon', 'Image', 'Text', 'Video'];
    const msgTypeResult = ['未知', '附件', '语音', '联系人名片', '表情', '图片', '文本', '视频'];
    return msgTypeResult[msgTypeEnum.indexOf(msgType)];
}

/**
 * @description 获取消息的提及对象数组
 * @param {Message} message 消息对象
 * @returns {Array} 提及用户数组
 */
const messageMention = async (message) => {
    return await message.mention();
}

module.exports = {
    messageInfo,
    messageType,
    messageRecord,
    messageRecordInfo,
    messageMention,
    messageText,
};
