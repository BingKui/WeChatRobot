// 群组聊天相关功能
const { mentioned } = require('../tools/tools.js');
const { contactListInfo, contactInfo } = require('../tools/contactTools.js');
const dialogMessage = require('./dialog.js');
/**
 * @description 回复群聊中的 @ 消息，并回 @ 回去
 * @param {Message} message 消息对象
 * @param {MessageInfo} info 消息内容对象
 * @param {ContactInfo} self 本身信息
 */
const groupMessage = async (message, info, self) => {
    // 自己发的消息，直接返回
    if (info.isSelf) {
        return;
    }
    // 如果 @ 到自己，在进行回复
    if (mentioned(info.mentionInfo, self.name)) {
        // 处理消息进行回复
        await dialogMessage(message);
    }
}

/**
 * @description 创建一个群聊
 * @param {Wechaty} bot 机器人对象实例
 * @param {Array<Contact>} cantactList 联系人列表
 * @param {String} topic 群名称
 */
const groupObject = async (bot, topic = '') => {
    // 查找是否存在
    const room = await bot.Room.find({topic});
    return room;
}

/**
 * @description 群聊中添加一个对象
 * @param {Wechaty} bot 机器人对象实例
 * @param {String} topic 群昵称
 * @param {Contact} contact 联系人对象
 */
const groupAddOne = async (bot, topic, contact) => {
    // 获取一个Room对象
    let room = groupObject(bot, topic);
    if (!room) {
        // 房间不存在，直接创建
        await bot.Room.create(cantactList, topic);
    }
    // 添加用户到群聊
    await room.add(contact);
}

/**
 * @description 用户离开群聊提醒，暂时用不到
 * @param {Room} room 群对象
 * @param {Array<Contact>} leaveList 离开的用户数组
 */
const groupLeaveMessage = async (room, leaveList) => {
    const infoList = contactListInfo(leaveList);
    const names = infoList.map(item => item.name).join('、');
    await room.say(`${names}退出了群聊。`)
}

/**
 * @description 用户新加入群聊
 * @param {Room} room 群对象
 * @param {Array<Contact>} joinList 加入的成员
 * @param {ContactInfo} inviter 邀请人
 * @param {ContactInfo} self 机器人自己
 * @TODO 如果是扫码，可能没有邀请者
 */
const groupJoinMessage = async (room, joinList, inviter, self) => {
    // 判断是否是机器人自己拉的人
    const isRobot = inviter.name === self.name;
    const infoList = contactListInfo(joinList);
    const names = infoList.map(item => item.name).join('、');
    let msgText = '';
    if (isRobot) {
        msgText = `欢迎${names}加入群聊！🎉 🎉 `;
    } else {
        msgText = `欢迎${names}加入群聊！🎉 感谢${inviter.name}的邀请！👍 `;
    }
    await room.say(msgText);
}

/**
 * @description 监听群昵称被修改事件
 * @param {Room} room 群对象
 * @param {String} topic 新群名
 * @param {String} oldTopic 旧群名
 * @param {Contact} contact 修改者对象
 * @param {ContactInfo} self 机器人信息
 */
const groupTopicChange = async (room, oldTopic, contact, self) => {
    // 判断是否是机器人自己修改的群名
    const isRobot = (await contactInfo(contact)).name === self.name;
    if (isRobot) {
        return;
    }
    await room.say('请不要随意修改群昵称！');
    // 修改回去
    await room.topic(oldTopic);
    await room.say('为防止不必要的麻烦，我已经帮忙修改回去！');
}

module.exports = {
    groupMessage,
    groupAddOne,
    groupLeaveMessage,
    groupJoinMessage,
    groupTopicChange,
}