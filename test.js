const { Wechaty } = require('wechaty');

const name = 'wechat-puppet-wechat';
let bot = '';
bot = new Wechaty({
  name, // generate xxxx.memory-card.json and save login data for the next login
});

//  二维码生成
function onScan(qrcode, status) {
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://wechaty.js.org/qrcode/',
    encodeURIComponent(qrcode),
  ].join('');
  console.log(qrcodeImageUrl);
}

// 登录
async function onLogin(user) {
  console.log(`贴心小助理${user}登录了`);
  if (config.AUTOREPLY) {
    console.log(`已开启机器人自动聊天模式`);
  }
  // 登陆后创建定时任务
  await initDay();
}

//登出
function onLogout(user) {
  console.log(`小助手${user} 已经登出`);
}

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.start().then(() => console.log('开始登陆微信')).catch((e) => console.error(e));