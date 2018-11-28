# 环境搭建

## CentOS 7

1. 安装 git

```
yum install git -y
```

2. 安装 nvm 

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

3. 使用 nvm 安装 相应的node版本

```
nvm install v10.13.0
```

4. 下载项目

```
git clone https://github.com/BingKui/WeChatRobot.git
```

## 功能相关

1. 没有MongoDB数据库

报错：

```
Mongoose connection disconnected
Mongoose connection error: MongoNetworkError: failed to connect to server [127.0.0.1:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
(node:12311) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server [127.0.0.1:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
    at Pool.<anonymous> (/root/WeChatRobot/node_modules/mongodb-core/lib/topologies/server.js:505:11)
    at Pool.emit (events.js:182:13)
    at Pool.EventEmitter.emit (domain.js:442:20)
    at Connection.<anonymous> (/root/WeChatRobot/node_modules/mongodb-core/lib/connection/pool.js:329:12)
    at Object.onceWrapper (events.js:273:13)
    at Connection.emit (events.js:182:13)
    at Connection.EventEmitter.emit (domain.js:442:20)
    at Socket.<anonymous> (/root/WeChatRobot/node_modules/mongodb-core/lib/connection/connection.js:245:50)
    at Object.onceWrapper (events.js:273:13)
    at Socket.emit (events.js:182:13)
    at Socket.EventEmitter.emit (domain.js:442:20)
    at emitErrorNT (internal/streams/destroy.js:82:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:50:3)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

解决方法：

- 注释到保存数据逻辑
- 注释掉引入MongoDB模块

代码位置：

```
# robot.js文件
// const { saveMessage } = require('./feature/mongodb.js');

// 保存聊天消息
// saveMessage(infoRecord);
```

## 问题及解决方法

1. git clone 失败

错误： 

```

```

解决方法：

2. nvm: 未找到命令

```
// 根目录下执行
source .bash_profile
```

3. gcc 问题

```
> nodejieba@2.2.6 install /root/WeChatRobot/node_modules/nodejieba
> node-gyp rebuild

make: 进入目录“/root/WeChatRobot/node_modules/nodejieba/build”
  CXX(target) Release/obj.target/nodejieba/lib/index.o
make: g++：命令未找到
make: *** [Release/obj.target/nodejieba/lib/index.o] 错误 127
make: 离开目录“/root/WeChatRobot/node_modules/nodejieba/build”
gyp ERR! build error
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     at ChildProcess.onExit (/root/.nvm/versions/node/v10.13.0/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:262:23)
gyp ERR! stack     at ChildProcess.emit (events.js:182:13)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:240:12)
gyp ERR! System Linux 3.10.0-693.el7.x86_64
gyp ERR! command "/root/.nvm/versions/node/v10.13.0/bin/node" "/root/.nvm/versions/node/v10.13.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /root/WeChatRobot/node_modules/nodejieba
gyp ERR! node -v v10.13.0
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: nodejieba@2.2.6 (node_modules/nodejieba):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: nodejieba@2.2.6 install: `node-gyp rebuild`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1
```

```
yum install gcc-c++
```

4. 机器人出现错误： Error: Error: Chromium revision is not downloaded. Run "npm install" or "yarn install"

```
# 进入目录
cd node_modules/wechaty-puppet-puppeteer
# 安装
npm install
```

然后会下载 Chromium。

```
> puppeteer@1.10.0 install /root/WeChatRobot/node_modules/wechaty-puppet-puppeteer/node_modules/puppeteer
> node install.js

Downloading Chromium r599821 - 105.1 Mb [=                   ] 6% 127.7s
```