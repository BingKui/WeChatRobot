const fs = require('fs');
const { robotSuffix } = require('./config');
const logger = (...args) => {
    console.log(args);
}

const bindKnowledgeAnswer = (m, content, key, answer, cb) => {
    if (content.indexOf(key) > -1) {
        m.say(`${answer}`);
        cb && cb();
    }
}

// 保存聊天记录
const saveChatInfo = (groupName, str) => {
    const _date = new Date().toLocaleDateString().replace(/\//g, '-');
    fs.appendFile(`temp/${groupName}-${_date}.txt`, str + '\n', 'utf8', (err) => {
        if (err) saveChatInfo(groupName, str);
        console.log('聊天记录已存储...');
    })
}
// 保存登录信息
const saveLoginInfo = (info) => {
    fs.appendFile(`log/login.txt`, info + '\n', 'utf8', (err) => {
        if (err) saveLoginInfo(info);
        console.log('登录信息已记录...');
    })
}

// 判断是否是 @ 机器人
const checkAtRobot = (username, content) => {
    let flag = false;
    const isAt = /\@/g.test(content);
    if (isAt) {
        const _username = (content.split('@')[1]).split(' ')[0];
        if (username === _username) {
            flag = true;
        }
    }
    return flag;
}

const randomNum = (n) => {
    let _num = '';
    for (let i = 0; i < n; i++) {
        _num += Math.floor(Math.random() * 10) + '';
    }
    return Math.floor(_num);
}

module.exports = {
    logger,
    bindKnowledgeAnswer,
    saveChatInfo,
    randomNum,
    saveLoginInfo,
    checkAtRobot
}