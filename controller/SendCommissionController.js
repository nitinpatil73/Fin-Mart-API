var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var Mailer = require('../controller/MailController');
var logger=require('../bin/Logger');

var SendCommission = function(req,res,next){
	con.execute_proc('call Send_Commission(?)',req.body.fbaid,function(data){
		if(data[0][0].Status != '1'){
			SendCommissionEmail(data[0][0].EmailID,data,req,res);
		}else{
			base.send_response("FBAID does not exists.",null,res);
		}
	});
};



function sendEmail(to,subject,text,emailTemplate,req,res){
	var email ={
		"to":to,
		"subject":subject,
		"text":text,
		"html":emailTemplate
	}
	Mailer.send(email,function(status){
		if(status === 1){
			var commilog = [];
			commilog.push(req.body.fbaid);
			commilog.push(to);
			console.log("---------------------commilog-------------------------");
			console.log(commilog);
			con.execute_proc('call Send_Commission_Mail_Log(?,?)',commilog,function(DataRes){
				console.log("---------------------DataRes-------------------------");
				console.log(DataRes);
				base.send_response("Mail send successfully.","success",res);
			});
			console.log("Mail send success");
		}else{
			base.send_response("Mail send fail.",null,res);
			console.log(subject +" :Mail send fail: "+status);
			logger.error('error', subject +" :Mail send fail: "+status, subject +" :Mail send fail: "+status);
		}
	});
}

function SendCommissionEmail(email,data,req,res){
	var start = formatDate(Date());
	var no = 1;
	var emailTemplate = "<!doctype html><html><head><meta charset='utf-8'><title>Untitled Document</title><style>table {border:1px solid #eee;}table td {padding:4px;border:1px solid #fff;}</style></head><body><table width='1000' border='0' style='font-size:13px;font-family:arial;color:#666;background:#f1f1f1;text-align:center;border:1px solid #f5f5f5;' cellpadding='0' cellspacing='0'><tbody><tr><td width='85' rowspan='2' bgcolor='#14529F' style='color:#fff;'>Sr. No</td><td width='239' rowspan='2' bgcolor='#14529F' style='color:#fff;'>Product</td><td colspan='3' bgcolor='#14529F' style='color:#fff;'>New Business</td><td colspan='3' bgcolor='#14529F' style='color:#fff;'>Renewal</td><td width='239' rowspan='2' bgcolor='#14529F' style='color:#fff;'>Special Deals</td></tr><tr><td width='80' bgcolor='#009746' style='color:#fff;'>Online</td><td width='84' bgcolor='#E31E25' style='color:#fff;'>Offline</td><td width='59' bgcolor='#01A0E2' style='color:#fff;'>PSU</td><td width='87' bgcolor='#009746' style='color:#fff;'>Online </td><td width='82' bgcolor='#E31E25' style='color:#fff;'>Offline</td><td width='61' bgcolor='#01A0E2' style='color:#fff;'>PSU</td></tr>";
	for (var i = 0; i < data[0].length; i++) {
		if(data[0][i].cmid == '17'){
			emailTemplate += "<tr style='color:#fff;'><td colspan='2' bgcolor='#01A0E2'>Premimum Paying Terms</td><td bgcolor='#01A0E2'>5 to 9*</td><td bgcolor='#01A0E2'>10</td><td bgcolor='#01A0E2'>11 & Above</td><td bgcolor='#01A0E2'>5 to 9*</td><td bgcolor='#01A0E2'>10 to 11</td><td bgcolor='#01A0E2'>12 & Above</td><td bgcolor='#01A0E2'>Special Deals</td></tr>";
		}
		emailTemplate += "<tr><td>" + data[0][i].cmid + "</td> <td>" + data[0][i].product + "</td> <td bgcolor='#D9EBDB'>" + data[0][i].new_buisness_online +"</td> <td bgcolor='#FBDBCE'>" + data[0][i].new_buisness_offline +"</td> <td bgcolor='#D7EEFC'>" + data[0][i].new_buisness_psu + "</td> <td bgcolor='#D9EBDB'>" + data[0][i].renewal_online + "</td> <td bgcolor='#FBDBCE'>" + data[0][i].renewal_offline + "</td> <td bgcolor='#D7EEFC'>" + data[0][i].renewal_psu + "</td> <td>" + data[0][i].special_deals + "</td> </tr>";
	}
	emailTemplate += "<tr><td bgcolor='#E31E25' style='color:#fff;-webkit-transform: rotate(-90deg);-moz-transform: rotate(-90deg); '><b>Terms &amp; Conditions</b></td><td colspan='3' bgcolor='#EBEDEC'><p style='margin:2px; padding:2px;'><b>For Loan Products:</b></p><p style='margin:2px; padding:2px;'>Per case payout is capped at Rs.3 lakh</p><p style='margin:2px; padding:2px;'>Processing fees to be collected as per bank's charges</p><p style='margin:2px; padding:2px;'>ROI to be as per bank's norms.</p></td><td colspan='3' bgcolor='#EBEDEC'><p style='margin:2px; padding:2px;'><b>For Insurance Products:</b></p><p style='margin:2px; padding:2px;'>For motors insurance, commission is payable only on OD Premium</p><p style='margin:2px; padding:2px;'>Health insurance commission is for new business only.</p></td><td colspan='2' bgcolor='#EBEDEC'><p style='margin:2px; padding:2px;'>PSU includes all Public Sector Companies viz.</p><p style='margin:2px; padding:2px;'>New India/United India / National / Oriental Insurance</p><p style='margin:2px; padding:2px;'>Life Insurance is form Term Insurance Products Only</p></td></tr></tbody></table></body></html>";
	sendEmail(email,"Finmart Commission | " + start + "","",emailTemplate,req,res);
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

module.exports = {"SendCommission":SendCommission};
