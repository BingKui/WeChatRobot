# WeChatRobot
微信自动回复机器人，帮助解决大批量关键词信息的回复。

支持自定义启用群组，自定义知识库，根据不同的答案回答不同的消息。

## 项目依赖环境

node: 版本大于 v8.0.0

## 运行

安装依赖：

```
npm install
```

修改所需要的配置信息：

打开 config.js 文件，补全文件中的相应的Key，目前有：

```
// 心知天气API密钥
weatherAPIKey: '',
// 百度AI应用 API Key
baiduApiKey: '',
// 百度AI应用 Secret Key
baiduSecretKey: '',
// 聚合数据，获取笑话的key
jokeKey: '',
// 聚合数据，问答类的key
qAndAKey: ''
```

运行：

```
npm start
```

扫描终端二维码，登录，然后完成。

## 注意

目前百度AI接口正在开发中，相应功能还未实现，可以不用填写百度AI相应的 key 。

## 配置知识库

修改项目下的 knowledge.json 文件中的 knowledge 字段，增加或者删除知识相关的关键词和答案。

修改 group 字段可以自定义需要开启的群聊名称，如果不设置 默认都不开启。(功能已废弃，目前全部开启，如果需要可自行修改注释代码，开启功能)

修改 warn 对象的相应字段可以修改警告的关键字和警告语。

## 目录说明

log：保存用户的登录信息，记录登录的次数和登录时间等信息.

temp：存放每天的聊天记录，并做存档。

knowledge：保存知识库资料，后期支持多个知识库切换.

token：保存百度AI的 Access Token 

## [更新日志](./updatelog.md)