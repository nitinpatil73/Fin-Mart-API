var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var RBLPlParameter = function(req, res, next) {
		wrapper('/api/rbl-pl-city-master', 'GET',
			{},function(RBLresponse) {
			if(RBLresponse != null){
				base.send_response("Success",RBLresponse,res);
			}else{
				base.send_response("Failure","",res);
			}

	},12);
};

var RBLlCalParameter = function(req, res, next) {
		wrapper('/api/rbl-pl-calc', 'POST',{
			"LnAmt": req.body.LnAmt,
			"TnrMths": req.body.TnrMths,
			"IRR": req.body.IRR
		},function(RBLcaldata) {
			if(RBLcaldata != null){
				base.send_response("Success",RBLcaldata,res);
			}else{
				base.send_response("Failure","",res);
			}

	},12);
}

module.exports = {"RBLPlParameter":RBLPlParameter,"RBLlCalParameter":RBLlCalParameter};