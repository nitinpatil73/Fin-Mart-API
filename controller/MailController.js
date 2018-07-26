'use strict';
const nodemailer = require('nodemailer');
var config=require('../bin/MailConfig');
var logger=require('../bin/Logger');
var Mailer = require('../controller/MailController');
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

class MailController{};
MailController.send=function(mailDetails,next){
    mailDetails.from="Magic FinMart <fba.support@magicfinmart.com>";
    nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(config.config);

    // setup email data with unicode symbols
    let mailOptions = mailDetails;

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.log('error', error.status, error.message);
         //   console.log(error);
            next(0);
        }
       // console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
    //    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         next(1);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        
    });
    next(1);
});
};

module.exports=MailController;
