// 消息轰炸功能

/**
 * @description 消息轰炸
 * @param {Contact | Room | Message} obj 联系人对象、聊天室对象、消息对象
 * @param {Array<string>} bomb 轰炸的消息内容
 * @todo 后续增加其他类型的消息轰炸，如图片、文件等。
 */
const bombMessage = async (obj, bomb) => {
    bomb.map(item => await obj.say(item));
}

/**
 * @description 消息和房间消息轰炸，支持 @ 人员
 * @param {Room | Message} obj 房间对象、消息对象
 * @param {Array<string>} bomb 轰炸消息内容
 * @param {Contact | Array<Contact>} @ 对象，或数组
 */
const roomAndMessageBomb = async (obj, bomb, memtion) => {
    bomb.map(item => await obj.say(item, memtion));
}

module.exports = {
    bombMessage,
    roomAndMessageBomb,
};