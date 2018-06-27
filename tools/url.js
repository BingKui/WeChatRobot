// 保存所有用到的地址路径
module.exports = {
    // 百度 Access Token 获取地址
    accessTokenUrl: 'https://aip.baidubce.com/oauth/2.0/token',
    // 语法分析
    grammarAnalyze: 'https://aip.baidubce.com/rpc/2.0/nlp/v1/lexer',
    // 情感分析
    emotionAnalyze: 'https://aip.baidubce.com/rpc/2.0/nlp/v1/sentiment_classify',
    // 笑话地址
    jokeUrl: 'http://v.juhe.cn/joke/randJoke.php?&type=json&key=',
    // 问答类地址
    qAndAUrl: 'http://op.juhe.cn/robot/index',
    // 心知天气api地址
    weatherUrl: 'https://api.seniverse.com/v3/weather/now.json?language=zh-Hans&unit=c',
}