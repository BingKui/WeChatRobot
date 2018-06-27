const mongolass = require('mongolass')();
const { mongoDB } = require('./config');
// let logger = require('log4js').getLogger('MongoDB');
const { logger } = require('./utils');
mongolass.connect(mongoDB).then(() => {
    logger('MongoDB connect success!');
}, () => {
    logger('MongoDB connect error!');
});

module.export = mongolass;