const { Wechaty } = require('wechaty');
const QrcodeTerminal = require('qrcode-terminal');
const { 
    messageInfo,
    messageRecordInfo,
} = require('./tools/messageTools.js');

const { contactInfo } = require('./tools/contactTools.js');

const { saveMessage } = require('./feature/mongodb.js');

const {
    groupMessage,
    groupJoinMessage,
    groupLeaveMessage,
    groupTopicChange,
} = require('./feature/group.js');

const { singleMessage } = require('./feature/single.js');

const { isAutoChangeAvatar } = require('./config/config.js');

// 引入数据库链接文件
require('./tools/mongo.js');

// 实例化机器人对象
const bot = Wechaty.instance();

// 全局对象，保存当前登录的用户
let userSelf = null;

// 监听扫码登录方法
bot.on('scan', (qrCode, statusCode) => {
    // 判断状态码
    if (!/201|200/.test(statusCode)) {
        QrcodeTerminal.generate(qrCode);
        console.log('扫描二维码登录~~~~');
    }
});

// 监听登录方法
bot.on('login', async (userContact) => {
    userSelf = await contactInfo(userContact);
    console.log('登录成功，用户信息：', userSelf);
    // 是否开启每天自动修改头像
    if (isAutoChangeAvatar) {
        avatarAutoChange(userContact);
    }
})

// 监听消息
bot.on('message', async (message) => {
    console.log('有新消息~~~');
    const info = await messageInfo(message);
    const infoRecord = messageRecordInfo(info);
    // 判断是否是个人类型的消息，如果不是，直接返回不做处理
    // 屏蔽公众号等发送过来的消息
    if (!info.sendInfo.isPerson) {
        return;
    }
    // 保存聊天消息
    saveMessage(infoRecord);
    // 判断消息来源
    if (info.isGroupMsg) {
        await groupMessage(message, info, userSelf);
    } else {
        await singleMessage(message, info);
    }
});

// 监听添加好友
bot.on('friendship', (friendship) => {
    // 无论什么信息，直接接受
    if (friendship) {
        friendship.accept();
    }
});

// 监听用户进入房间
bot.on('room-join', async (room, inviterList, inviter) => {
    await groupJoinMessage(room, inviterList, inviter, userSelf);
});

// 监听用户离开房间
bot.on('room-leave', async (room, leaveList) => {
    await groupLeaveMessage(room, leaveList);
});

// 监听房间名称修改事件
bot.on('room-topic', async (room, topic, oldTopic, changer) => {
    await groupTopicChange(room, oldTopic, changer, userSelf);
});

// 监听用户退出登录
bot.on('logout', () => {
    userSelf = null;
});

// 监听出错
bot.on('error', (error) => {
    console.log('机器人出现错误：', error);
});

// 开始运行
bot.start();