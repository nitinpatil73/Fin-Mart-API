var con=require('../bin/dbconnection.js');
var base=require('./baseController');


var getTicketCategories = function(req, res, next) {
	con.execute_proc('call getTicketCategories()',null,function(data) {

	if(data!=null){
		var category = data[0];
		var subcategory = data[1];
		var classification = data[2];
		var response ={"category" : category ,"subcategory":subcategory,"classification":classification };
		base.send_response("Success", response,res);
	}
	else{
			base.send_response("Failure", null,res);
	}
});
};


var createTicket = function(req, res, next) {

	var parameter = [];
	parameter.push(req.body.CategoryId);
	parameter.push(req.body.SubCategoryId);
	parameter.push(req.body.classification);
	parameter.push(req.body.Message);
	parameter.push(req.body.FBAID);
	
	con.execute_proc('call CreateATicket(?,?,?,?,?)',parameter,function(data) {

	if(data[0][0].SavedStatus == 0){
		base.send_response("Ticket raised successfully", data[0],res);
	}
	else{
		base.send_response("Failure", null,res);
	}

	
});
};

var getTicketRequest = function(req, res, next){
		var getTicketRequest = [];
		getTicketRequest.push(req.body.fbaid);	
	//	console.log(getTicketRequest);
		con.execute_proc('call Usp_Ticket_Data(?)',getTicketRequest,function(data) {
		if(data!=null)
		{
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
module.exports = {"getTicketCategories":getTicketCategories,"createTicket":createTicket,"getTicketRequest":getTicketRequest};