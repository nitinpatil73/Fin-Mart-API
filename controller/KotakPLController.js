var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var KotakplParameter = function(req, res, next) {
		wrapper('/api/kotak-pl-company-master', 'GET',
			{},function(kotakresponse) {
			if(kotakresponse != null){
				base.send_response("Success",kotakresponse,res);
			}else{
				base.send_response("Failure","",res);
			}

	},12);
};

var KotakplCityParameter = function(req, res, next) {
		wrapper('/api/kotak-pl-city-list', 'GET',
			{},function(kotakplcityresponce) {
			if(kotakplcityresponce != null){
				base.send_response("Success",kotakplcityresponce,res);
			}else{
				base.send_response("Failure","",res);
			}
	},12);
};

var KotakplCalParameter = function(req, res, next) {
		wrapper('/api/kotak-pl-calc', 'POST',{
			"NMI": req.body.NMI,
			"Organization": req.body.Organization,
			"LnAmt": req.body.LnAmt
		},function(kotakcaldata) {
			if(kotakcaldata != null){
				base.send_response("Success",kotakcaldata,res);
			}else{
				base.send_response("Failure","",res);
			}

	},12);
}

module.exports = {"KotakplParameter":KotakplParameter,"KotakplCityParameter":KotakplCityParameter,"KotakplCalParameter":KotakplCalParameter};