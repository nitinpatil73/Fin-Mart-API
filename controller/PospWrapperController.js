var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');
var handler = require('./HandlerController');

var pospwrapper = function(req, res, next)
{
	var add_contact_parameter = [];


	wrapper('/api/GETPOSPID?','POST',{
     "SS_ID": req.body.SS_ID
	},function(data)
		{
			console.log(data);
			  if (isNaN(data))
			  {
         
                base.send_response("No Data Available",null,res);	
			  }
			  else
			  {
			     if (req.body.Type == 1)
                {
                    data = "http://posp.policyboss.com/Pos/AppointmentLetter/" + data;
                }
                else
                {
                    data = "http://posp.policyboss.com/Pos/GeneratePdf/" + data;
                }	
			  	base.send_response("Sucess",data,res);	
			 
			  }
			 				
		},2);

	};



module.exports = {"pospwrapper":pospwrapper};