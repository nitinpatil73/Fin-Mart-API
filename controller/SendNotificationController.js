var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var notificationwrapper = require('./sendnotificationWrapper.js');

var sendnotification = function(req, res, next){
    var sendnotification = [];
    console.log(sendnotification);
    con.execute_proc('call Usp_send_notification()',null,function(data) {
    if(data!=null)
    {
      for (var i = 0; i < data[0].length; i++) {
        var message ={
          "notifyFlag": data[0][i].MessageType,
          "img_url": data[0][i].ImagePath,
          "body":data[0][i].Message,
          "title":data[0][i].NotificationTitle,
          "web_url": data[0][i].WebUrl,
          "web_title": data[0][i].WebTitle,
          "message_id":data[0][i].UserNotificationRequestId
        };

        var notificationdata = {
          "to": data[0][i].TokeId,
          "data":message
        };
//console.log(notificationdata);
        sendNotificationToUser(notificationdata)
      }
            //console.log(message);
      //for (var i = 0 ; i < data[0][1].length; i++) {
      base.send_response("Success",data[0],res);
      //}   
    }
    else
    {
      base.send_response("No data found",null,res);
    } 
    });
}

function sendNotificationToUser (data) {
  console.log("***********************************");
notificationwrapper('/fcm/send', 'POST', 
  data
  , function(response) {
    console.log("-----------------------------");
     console.log(data);      
  });
};

module.exports = sendnotification;