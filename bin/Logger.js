var winston = require('winston');
const { createLogger, format,transports } = winston;
const { combine, timestamp, label, prettyPrint } = format;
// Enable exception handling when you create your logger.
const logger = winston.createLogger({
   format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.File({ filename: './log/combined.log' ,timestamp:'true'}) 
  ],
  exceptionHandlers: [
    new transports.File({ filename: './log/exceptions.log',timestamp:'true' })
  ],
  uncaughtException :[
       new transports.File({ filename: './log/error.log',timestamp:'true' })
  ]
});
module.exports=logger;