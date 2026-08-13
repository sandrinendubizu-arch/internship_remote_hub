const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
const logItem = `${format(new Date(), 'yyyy-MM-dd tHH:mm:ss')} \t ${uuid()} \t ${message}\n`;
console.log(logItem);
try {
    if (!fs.existsSync(path.join(__dirname, '..','logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    
  await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
} catch (err) {
  console.error('Error occurred while writing to log file:', err);
}
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger };
