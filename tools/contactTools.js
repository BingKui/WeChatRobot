/**
 * @description 返回联系人的信息
 * @param {Contact} contact 联系人对象
 * @returns {Object<ContactInfo>} 用户基础信息对象
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
        isPerson: contactIsPerson(contact), // 是否是个人的标识
    };
}

/**
 * @description 处理联系人类型
 * @param {Contact} contact 联系人对象
 * @returns {String} 返回用户类型
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
 * @description 判断是否是个人类型的联系人
 * @param {Contact} contact 联系人对象
 * @return {Boolean} 返回是否是个人，是的话 true，不是 false
 */
const contactIsPerson = (contact) => {
    const type = contact.type();
    let result = false;
    if (type === 'Personal') {
        result = true;
    }
    return result;
}

/**
 * @description 处理联系人性别
 * @param {Contact} contact 联系人对象
 * @returns {String} 返回用户性别
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
 * @returns {Array<ContactInfo>} 返回处理过的用户信息数组
 */
const contactListInfo = (contactList = []) => {
    return contactList.map(async item => await contactInfo(item));
}

module.export = {
    contactType,
    contactInfo,
    contactGender,
    contactListInfo,
    contactIsPerson,
};