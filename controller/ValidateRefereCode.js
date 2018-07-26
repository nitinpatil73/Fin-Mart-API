var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var validate_refer_code = function(req,res,next)
{
	var ValidateParameter = [];
	ValidateParameter.push(req.body.ref_type);
	ValidateParameter.push(req.body.ref_code);
	if(req.body.ref_type != null && req.body.ref_type != '' && req.body.ref_code != null && req.body.ref_code != '')
	{
		con.execute_proc('call validate_referer_code(?,?)',ValidateParameter,function(data){
			if(data[0][0].SavedStatus == '0')
			{
				base.send_response(data[0][0].Message,'success',res);
			}
			else
			{
				base.send_response(data[0][0].Message,null,res);
			}

		});
	}
	else
	{
		base.send_response("Ref type or Ref code does not exists.",null,res);
	}
};

module.exports = {"validate_refer_code":validate_refer_code};