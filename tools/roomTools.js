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
    return {
        name: '', // 群名字
        announce: '', // 群公告
        memberNumber: 0, // 群成员数
        avatar: '', // 群头像图片
    };
}

/**
 * @description 获取单个群成员信息
 * @param {Room} room 群对象
 * @param {string | filter} query 检索条件
 * @returns {ContactInfo} 返回处理过的群成员信息
 * @example 
 * filter = {
 *      name: '',
 *      roomAlias: '',
 *      contactAlias: ''
 * }
 */
const roomMeberInfo = async (room, query) => {
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
 */
const roomHasPeople = async (room, bot, str) => {
    const contact = await bot.Contact.find(str);
    let result = false;
    if (contact) {
        result = await room.has(contact);
    }
    return result;
}
/**
 * @description 获取所有群成员信息
 */
/**
 * @description 获取所有群成员信息
 */
/**
 * @description 获取所有群成员信息
 */
/**
 * @description 获取所有群成员信息
 */
/**
 * @description 获取所有群成员信息
 */

module.export = {
    roomInfo,
    roomMeberInfo,
    roomMemberListInfo
};