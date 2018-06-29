const dayjs = require('dayjs');
const formatDate = (date, str = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(date).format(str);
}

module.exports = {
    formatDate,
};