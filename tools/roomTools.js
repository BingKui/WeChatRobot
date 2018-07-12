const {
    contactInfo,
    contactListInfo,
} = require('./contactTools.js');

/**
 * @description 获取群聊基本信息
 * @param {Room} room 群对象
 * @returns {Object} 返回群聊的基本信息
 */
const roomInfo = async (room) => {
    if (!room) {
        return null;
    }
    const members = await room.memberList();
    return {
        name: await room.topic(), // 群名字
        // announce: await room.announce(), // 群公告，暂不支持
        memberNumber: members.length, // 群成员数
        // avatar: await room.avatar(), // 群头像图片，暂不支持
    };
}

/**
 * @description 获取单个群成员信息
 * @param {Room} room 群对象
 * @param {String | filter} query 检索条件
 * @returns {ContactInfo} 返回处理过的群成员信息
 * @example 
 * filter = {
 *      name: '',
 *      roomAlias: '',
 *      contactAlias: ''
 * }
 */
const roomMemberInfo = async (room, query) => {
    const member = await room.member(query);
    return await contactInfo(member);
}

/**
 * @description 获取所有群成员信息
 * @param {Room} room 群对象
 * @returns {Array<ContactInfo>} 返回处理过的群成员信息
 */
const roomMemberListInfo = async (room) => {
    const memberList = await room.memberAll();
    return await contactListInfo(memberList);
}
/**
 * @description 通过字符串查询群聊是否存在某人
 * @param {Room} room 群对象
 * @param {Robot} bot 机器人对象
 * @param {String} query 需要查询的用户条件
 */
const roomHasPeople = async (room, bot, query) => {
    const contact = await bot.Contact.find(query);
    let result = false;
    if (contact) {
        result = await room.has(contact);
    }
    return result;
}

module.exports = {
    roomInfo,
    roomHasPeople,
    roomMemberInfo,
    roomMemberListInfo
};