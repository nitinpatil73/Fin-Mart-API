var winston = require('winston');
const { createLogger, transports } = winston;

// Enable exception handling when you create your logger.
const logger = winston.createLogger({
  transports: [
    new transports.File({ filename: './log/combined.log' ,timestamp:'true'}) 
  ],
  exceptionHandlers: [
    new transports.File({ filename: './log/exceptions.log',timestamp:'true' })
  ],
  _uncaughtException :[
       new transports.File({ filename: './log/error.log',timestamp:'true' })
  ],timestamp: +new Date()
});
module.exports=logger;