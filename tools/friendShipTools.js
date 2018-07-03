/**
 * @description 返回好友请求的信息
 * @param {Friendship} friendship 好友请求对象
 * @return {Object} 好友请求对象内容
 */
const friendshipInfo = (friendship) => {
    return {
        verifyMessage: friendship.hello(),
        contact: friendship.contact(),
        type: friendshipType(friendship),
    };
}

/**
 * @description 返回好友请求的信息类型
 * @param {Friendship} friendship 好友请求对象
 * @return {String} 类型
 */
const friendshipType = (friendship) => {
    let result = '';
    switch (friendship.type()) {
        case 0:
            result = '未知';
            break;
        case 1:
            result = '确认';
            break;
        case 2:
            result = '收到';
            break;
        case 3:
            result = '验证';
            break;
        default:
            result = '';
    }
    return result;
}