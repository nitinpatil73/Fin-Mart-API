var base=require('./baseController');
var con=require('../bin/dbconnection.js');
var handler = require('./HandlerController');
class ContactData{};
ContactData.addcontacts = function(req, res, next) {

//	console.log(req.body.fbaid);
	
//	console.log(req.body.contactlist)

var memeberlength = req.body.contactlist.length;
var resp;


 try {
	for (var i = 0; i < memeberlength; i++) {
var add_contact_parameter = [];

add_contact_parameter.push(req.body.contactlist[i].name);
add_contact_parameter.push(req.body.contactlist[i].mobileno);
add_contact_parameter.push(req.body.fbaid);



	con.execute_proc('call sp_addcontactstofbacontacts(?,?,?)',add_contact_parameter,function(data) {
  						
});
	
	}

	base.send_response("Contact Added successfully","Sucess",res);	
}catch (ex) {
	console.log(ex);
   base.send_response("Failure",null,res);	
  }
	

};


ContactData.getcontactLeads = function(req, res, next) {

	var get_lead_parameter = [];


	get_lead_parameter.push(req.body.fbaid);

	con.execute_proc('call sp_showcontactleads(?)',get_lead_parameter,function(data) {
    console.log(data);

	if(data[0][0].response == 3){
		base.send_response("Lead Not exist!!",null,res);
	}
	else{
		base.send_response("Lead list", data[0],res);			
	}
});
};


module.exports=ContactData;