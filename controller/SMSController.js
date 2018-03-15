var wrapper = require('./wrapper.js');
const https = require('http');
var base=require('./baseController');

class SMSController{};

SMSController.sendMessage = function (phoneno, message) {
	console.log(phoneno);
https.get("http://vas.mobilogi.com/api.php?username=rupeeboss&password=pass1234&route=1&sender=FINMRT&mobile[]="+phoneno+"&message[]="+message, (resp) => {
   var data = '';
// if(sendresponse ==1){
// 	base.send_response("success", "success",res);
// }
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });
//console.log(data);

 });
};

module.exports=SMSController;