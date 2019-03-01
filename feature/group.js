// 群组聊天相关功能
const { Wechaty } = require('wechaty');
const { mentioned } = require('../tools/tools.js');
const { contactListInfo, contactInfo } = require('../tools/contactTools.js');
const dialogMessage = require('./dialog.js');
const { messageText, messageInfo } = require('../tools/messageTools.js');

const bot = Wechaty.instance();

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
 * @description 查询群聊对象，不能存在直接创建
 * @param {Array<Contact>} cantactList 联系人列表
 * @param {String} topic 群名称
 */
const groupObject = async (topic = '') => {
    // 查找是否存在
    let room = await bot.Room.find({topic});
    console.log('查找到的房间为：', room);
    if (!room) {
        // 房间不存在，直接创建
        room = await wechaty.Room.create([contact], topic);
    }
    return room;
}

/**
 * @description 群聊中添加一个对象
 * @param {String} topic 群昵称
 * @param {Contact} contact 联系人对象
 */
const groupAddOne = async (topic, contactName) => {
    // 获取一个Room对象
    const room = await groupObject(topic);
    console.log('获取到的群信息为：', room);
    const contact = await bot.Contact.find({name: contactName});
    console.log('需要加入群聊的对象为：', contact);
    // 添加用户到群聊
    try {
        await room.add(contact);
        setTimeout(() => room.say('Welcome ', contact), 10 * 1000);
    } catch (e) {
        console.log('Bot', 'putInRoom() exception: ' + e.stack);
    }
}

/**
 * @description 群聊添加用户操作
 * @param {Message} message 消息对象
 * @return {Boolean} 消息发送成功与否
 */
const groupAddAction = async (message) => {
    const text = messageText(message);
    if (text.indexOf('进群') > -1) {
        const info = await messageInfo(message);
        console.log('消息发送者：', info.sendInfo.name);
        // 目前只先添加到 “测试群聊”
        await groupAddOne('测试群聊', info.sendInfo.name);
        return true;
    }
    return false;
}

/**
 * @description 用户离开群聊提醒，暂时用不到
 * @param {Room} room 群对象
 * @param {Array<Contact>} leaveList 离开的用户数组
 */
const groupLeaveMessage = async (room, leaveList) => {
    const names = leaveList.map(item => item.name()).join('、');
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
    const isRobot = inviter.name() === self.name;
    const names = joinList.map(item => item.name()).join('、');
    let msgText = '';
    if (isRobot) {
        msgText = `欢迎${names}加入群聊！🎉 🎉 `;
    } else {
        msgText = `欢迎${names}加入群聊！🎉 感谢${inviter.name()}的邀请！👍 `;
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
    groupAddAction,
}