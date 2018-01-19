// var express = require('express');
// var router = express.Router();
// var response_status = require('./responsestatus');
var con=require('../bin/dbconnection.js');
var base=require('./baseController');

var insertFBARegistration = function(req, res, next) {

// console.log(res.body);

var fbadata = [];

fbadata.push(req.body.FirsName);//FirsName`,
fbadata.push(req.body.LastName);//`LastName`,
fbadata.push(req.body.Gender);//`Gender`,
fbadata.push(req.body.DOB);//`DOB`,
fbadata.push(req.body.MobiNumb1);//`MobiNumb1`,
fbadata.push(req.body.MobiNumb2);//`MobiNumb2`,
fbadata.push(req.body.EmailID);//`EmailID`,
fbadata.push(req.body.PinCode);//`PinCode`,
fbadata.push(req.body.City);//`City`,
fbadata.push(req.body.StatID);//`StatID`,
fbadata.push(req.body.FBAStat);//`FBAStat`,
fbadata.push(req.body.SMID);//`SMID`,
fbadata.push(req.body.Designation);//`Designation`,
fbadata.push(req.body.CustID);//`CustID`,
fbadata.push(req.body.CityId);//`CityId`,
fbadata.push(req.body.PayStat);//`PayStat`,
fbadata.push(req.body.created_by);//`created_by`,
//res.send(fbadata);

con.execute_proc('call InsertFBARegistration(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',fbadata,function(data) {
	if(data[0][0].SavedStatus == 0){
		base.send_response(data[0][0].Message,data,res);

		// response_status.success_response(data[0][0].Message,'Success',function (return_data) {
	 //                          res.send(return_data);
	 //                });
	}
	else{

				base.send_response(data[0][0].Message, null,res);

				// response_status.failure_response(data[0][0].Message,'Failure',function (return_data) {
    //                       res.send(return_data);
    //             });
	}
});

};


module.exports = insertFBARegistration;