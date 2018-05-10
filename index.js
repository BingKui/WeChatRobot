const { Wechaty, Room } = require('wechaty');
const fs = require('fs');

// 实例化对象
const chat = Wechaty.instance();

// 读取知识库
const knowledgeFile = JSON.parse(fs.readFileSync('knowledge.json', { encoding:'utf-8' }));

// 扫码登录
chat.on('scan', (url, code) => {
    // logger(`请扫描二维码进行登录：${code}\n${url}`);
    if (!/201|200/.test(String(code))) {
        logger('请扫描二维码进行登录！');
        const loginUrl = url.replace(/\/qrcode\//, '/l/')
        require('qrcode-terminal').generate(loginUrl)
    }
})
.on('login', (user) => {
    logger(`登录用户为：${user}`);
    logger('---------------------------------------');
})
// 自动添加好友
.on('friend', async function (contact, request) {
    if (request) {
        await request.accept()
        logger(`联系人: ${contact.name()} \n好友请求信息： ${request.hello}`)
        logger('---------------------------------------');
    }
})

// 监听收到信息
.on('message', async function (m) {
    const contact = m.from()
    const content = m.content()
    const room = m.room()

    if (room) {
        logger(`聊天群: ${room.topic()} \n联系人: ${contact.name()} \n消息内容: ${content}`)
        logger('---------------------------------------');
    } else {
        logger(`联系人: ${contact.name()} \n消息内容: ${content}`)
        logger('---------------------------------------');
    }
    //  自己发送的消息，直接返回
    if (m.self()) {
        return
    }
    const _name = room ? room.topic() : '';
    const _data = knowledgeFile.knowledge;
    const _warn = knowledgeFile.warn.keyword;
    // 判断聊天房间
    if (knowledgeFile.group.indexOf(_name) > -1) {
        // 自定义关键词回复
        _data.foreach(item => {
            bindKnowledgeAnswer(m, content, item.keyword, item.answer);
        });
        _warn.foreach(item => {
            bindKnowledgeAnswer(m, content, item, knowledgeFile.warn.answer);
        });
    }
})


// 开始运行
.start();

const bindKnowledgeAnswer = (m, content, key, answer) => {
    if (content.indexOf(key) > -1) {
        m.say(`AI助手：${answer}`);
    }
}

const logger = (...args) => {
    console.log({...args});
}