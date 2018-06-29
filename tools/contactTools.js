/**
 * @description 返回联系人的信息
 * @param {Contact} contact 联系人对象
 * @returns {Object} 用户基础信息对象
 */
const contactInfo = async (contact) => {
    if (!contact) {
        return null;
    }
    return {
        name: await contact.name(), // 名字
        alias: await contact.alias(), // 备注名称
        // age: '', // 年龄
        gender: contactGender(contact), // 性别
        avatar: await contact.avatar(), // 头像
        star: contact.star(), // 是否是星标用户
        isFriend: contact.friend(), // 是否是好友关系
        type: contactType(contact), // 联系人类型，官方或者个人
        province: contact.province(), // 省份
        city: contact.city(), // 城市
    };
}

/**
 * @description 处理联系人类型
 * @param {Contact} contact 联系人对象
 * @returns {string} 返回用户类型
 */
const contactType = (contact) => {
    const _type = contact.type();
    let _result = '未知';
    if (_type === 'Personal') {
        _result = '个人';
    }
    if (_type === 'Official') {
        _result = '官方';
    }
    return _result;
}

/**
 * @description 处理联系人性别
 * @param {Contact} contact 联系人对象
 * @returns {string} 返回用户性别
 */
const contactGender = (contact) => {
    const gender = contact.gender();
    let result = '未知';
    if (gender === 1) {
        result = '男';
    }
    if (gender === 2) {
        result = '女';
    }
    return result;
}

/**
 * @description 处理联系人列表
 * @param {Array<Contact>} contactList 联系人对象数组
 * @returns {Array<contactInfo>} 返回处理过的用户信息数组
 */
const contactListInfo = (contactList = []) => {
    return contactList.map(async item => await contactInfo(item));
}

module.export = {
    contactType,
    contactInfo,
    contactGender,
    contactListInfo,
};