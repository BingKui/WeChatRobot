// 配置数据公共文件，后续相应逐步替换为借口获取相应的数据
// 需要配套后台管理系统，管理数据（项目待添加，规划中）
module.exports = {
    plans: [{
        startTime: {
            hour: 19,
            minute: 30,
        },
        endTime: {
            hour: 21,
            minute: 0,
        },
        message: '跑步中，有事电话联系~~',
    },],
    remind: {
        remindNoonBreakHour: [12, 13],
        remindNoonBreakData: ['中午休息一下吧！这样下午才能更好工作！😊 ', '你现在睡一会，下午会更有精神哟！'],
        remindSleepHour: [0, 1, 2, 3, 4, 5, 6],
        remindSleepData: ['早点睡吧！', '熬夜对身体不好，早点睡吧！', '你是不是忘了时间，现在还不睡觉？？！！', '半夜三更，你不睡觉是想要上天吗？',
        '你要是再不睡，天就要亮了！', '天都亮了，你不会还没睡觉吧！？', '恭喜你！成功的熬了个夜！']
    },
    playlist: [{
        name: '完了，耳朵怀孕的感觉！',
        address: 'https://music.163.com/#/playlist?id=2281915904',
        from: 'netease',
    }],
    cartoonData: [{
        "name": "西行纪",
        "isVip": true,
        "address": "https://v.qq.com/x/cover/0gsf9fytppje54d.html"
    }, {
        "name": "魔道祖师",
        "isVip": true,
        "address": "https://v.qq.com/x/cover/k4mutekomtrdbux.html"
    }, {
        "name": "全职高手特别篇",
        "isVip": true,
        "address": "https://v.qq.com/x/cover/hlo45ourdy4rh3t.html"
    }, {
        "name": "我的逆天神器",
        "isVip": false,
        "address": "https://v.qq.com/x/cover/fqtckz7db8g3rtp.html"
    }, {
        "name": "刺客伍六七",
        "isVip": false,
        "address": "https://v.qq.com/x/cover/9jh7p3r7ljkxkmc.html"
    }],
};