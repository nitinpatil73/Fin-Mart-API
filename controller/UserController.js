var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var Mailer = require('../controller/MailController');

var forgotPassword = function(req, res, next) {

var emailparameter = [];
emailparameter.push(req.body.EmailID);	//
//console.log(emailparameter);


con.execute_proc('call forgotPassword(?)',emailparameter,function(data) {
	//console.log("**************");
	//console.log(data[1]);
	if(data[0][0].EmailStatus == 0){
		sendforgotpassword(data,res);
		//base.send_response("Success", data[0],res);
	}
	else{
		base.send_response("Invalid email id", "",res);				
	}
});

};

function sendforgotpassword(data,res) {
// console.log("data[0].FullName"+data[0][0].FullName);
	var emailTemplate = "<div>Hello&nbsp;<strong>{{name}}</strong>,<br /><br />This email was sent automatically by Finmart in response to your request to Forgot password.<br /><br />your password is : {{password}}&nbsp;<br /><br />Thanks &amp; Regards<br /><br />Finmart Team.</div>";
	emailTemplate = emailTemplate.replace("{{name}}",data[0][0].FullName);
	emailTemplate = emailTemplate.replace("{{password}}",data[0][0].Password);
	sendEmail(data[0][0].EmailID,"Finmart Forgot Password request","",emailTemplate,res);
}

function sendEmail(to,subject,text,htmlbody,res){
	var email = {
        "to": to, 
        "subject": subject, 
        "text": text, 
        "html": htmlbody     
	}

	Mailer.send(email,function(status){
      if(status===1){
     base.send_response("Email has been sent on your registered Email address.","Email has been sent on your registered Email address.",res);
      }else{
          base.send_response("Failure","",res);
      }
    });

}

module.exports = forgotPassword;