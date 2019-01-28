var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var GetConstantData = function(req, res, next){
		var GetConstantData = [];
		GetConstantData.push(req.body.FBAID);
		GetConstantData.push(req.body.VersionCode);
		con.execute_proc('call Get_Constant_Data(?,?)',GetConstantData,function(data) {
		if(data != null && data != '' ){
			
			var response={
			     "VersionCode":data[0][0].ConstantValue,
			     "Versiondate":"05-July-2018",
				 "IsForceUpdate":data[0][1].ConstantValue,
				 "PBNoOfHits":data[0][2].ConstantValue,
				 "PBHitTime":data[0][3].ConstantValue,
				 "ROIHLBL":data[0][4].ConstantValue,
				 "ROIPLBL":data[0][5].ConstantValue,
				 "ROILABL":data[0][6].ConstantValue,
				 "POSPNo":data[0][7].ConstantValue,
				 "POSPStat":"6",
				 "POSPTraining":"1",
				 "MPSStatus":data[0][9].ConstantValue,
				 "UpdateMaster":"2",
				 "logtracking":"1",
				 "HelpNumber":data[0][10].ConstantValue,
				 "POSPProfileUrl":"",
                 "FBAProfileUrl":"",
				 "HorizonVersion":"2.0",
				 "healthappenable":"0"
			};
			base.send_response("Success",response,res);
		}
		else{
			base.send_response("FBAID does not exits.",null,res);
		}
   	});

}


module.exports = {"GetConstantData":GetConstantData};	