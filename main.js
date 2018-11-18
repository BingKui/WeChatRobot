const { Wechaty } = require('wechaty');

const wechaty = new Wechaty()

wechaty.on('scan', (qrCode, statusCode) => {
    // 判断状态码
    if (!/201|200/.test(statusCode)) {
        QrcodeTerminal.generate(qrCode);
        console.log('扫描二维码登录~~~~');
    }
});

wechaty.start();