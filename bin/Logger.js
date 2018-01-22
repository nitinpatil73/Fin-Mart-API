var winston = require('winston');
const { createLogger, transports } = winston;

// Enable exception handling when you create your logger.
const logger = winston.createLogger({
  transports: [
    new transports.File({ filename: './log/combined.log' }) 
  ],
  exceptionHandlers: [
    new transports.File({ filename: './log/exceptions.log' })
  ],
  _uncaughtException :[
       new transports.File({ filename: './log/error.log' })
  ],timestamp: +new Date()
});
module.exports=logger;