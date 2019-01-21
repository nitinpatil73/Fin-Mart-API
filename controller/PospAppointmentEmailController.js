var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var Mailer = require('../controller/MailController');

var PospAppointmentsEmail = function(req, res, next) {
	if(req.body.fbaid != null || req.body.fbaid != ''){
		var appointmentsparameter = [];
		appointmentsparameter.push(req.body.fbaid);
		appointmentsparameter.push(req.body.url);
		appointmentsparameter.push(req.body.type);
		con.execute_proc('call save_posp_appointment_email(?,?,?)',appointmentsparameter,function(data) {
			if(data != null || data != ''){
				sendRegistrationEmail(data[0][0].email,req.body.url);
				base.send_response("saved Successfully.",data[0],res);
			}else{
			    base.send_response("save failed",null,res);
			}

		});
	}else{
		base.send_response("Please enter fbaid",null,res);
	}
};


function sendEmail(to,subject,text,htmlbody){
	var email = {
        "to": to, 
        "subject": subject, 
        "text": text, 
        "html": htmlbody     
	}

	Mailer.send(email,function(status){
      if(status===1){
          console.log("Mail send success");
      }else{
         console.log(subject +" :Mail send fail: "+status);
         logger.error('error', subject +" :Mail send fail: "+status, subject +" :Mail send fail: "+status);
		// logger.log(subject +" :Mail send fail: "+status);
      }
    });

}
function sendRegistrationEmail(email,url) {
	// var emailTemplate = "<span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Dear Mr.&nbsp;</span><b style='color: #222222; font-family: Arial; font-size: 13.3333px'>{{name}}</b><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>,</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Welcome to Magic-Finmart and congratulations on successfully registering as a Magic-Finmart Business Associate.</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Your Magic-Finmart id is&nbsp;</span><b style='color: #222222; font-family: Arial; font-size: 13.3333px'><a href='mailto:{{mailto}}' target='_blank' style='color: #1155cc'>{{email}}</a></b><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>&nbsp;&amp; password is&nbsp;</span><b style='color: #222222; font-family: Arial; font-size: 13.3333px'>{{password}}</b><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>We thank you for associating with us on the platform and assure you of our best services at all times.</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Warm Regards,</span><br style='color: #222222; font-family: Arial; font-size: 13.3333px' /><span style='color: #222222; font-family: Arial; font-size: 13.3333px'>Magic Finmart Team</span><div class='yj6qo' style='color: #222222; font-family: Arial; font-size: 13.3333px'></div><div><span style='color: #222222; font-family: Arial; font-size: 13.3333px'><br /> </span></div>";
	// emailTemplate = emailTemplate.replace("{{name}}",req.body.FirstName + ' ' + req.body.LastName);
	// emailTemplate = emailTemplate.replace("{{email}}",req.body.EmailId);
	// emailTemplate = emailTemplate.replace("{{mailto}}",req.body.EmailId);
	// emailTemplate = emailTemplate.replace("{{password}}",req.body.password);
	sendEmail(email,"POSP Appointment Letter","",url);
}

module.exports = {"PospAppointmentsEmail" : PospAppointmentsEmail};