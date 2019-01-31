var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

var OneTimePushSubPospEntry = function(req, res, next) {
	con.execute_proc('call getfbaidonetimepushsubpospdata()',null,function(respdatasub) {
		if(respdatasub != null || respdatasub != ''){
			for (var i = 0; i < respdatasub[0].length; i++) {
				// console.log("---------------------------------");
				// console.log(respdatasub[0][i].parentid);
				SubPospEntry(respdatasub[0][i].FBAID,req, res, next);
			}
			//base.send_response("Success",respdatasub[0],res);
		}else{
			base.send_response("Failure",null,res);
		}
	});
}

function SubPospEntry(FBAID,req, res, next){
	con.execute_proc('call GetDataSubPospEntry(?)',FBAID,function(respdatasub) {
		if(respdatasub != null || respdatasub != ''){
			var log = {
				"First_Name":respdatasub[0][0].FirsName,
			    "Last_Name" : respdatasub[0][0].LastName,
			    "DOB": SubPospEntryformatDate(respdatasub[0][0].DOB),
			    "Gender" : respdatasub[0][0].Gender,
			    "Mobile":respdatasub[0][0].MobiNumb1,
			    "Mobile2":respdatasub[0][0].MobiNumb2,
			    "EmailId":respdatasub[0][0].EmailID,
			    "Pincode":respdatasub[0][0].PinCode,
			    "City": respdatasub[0][0].City,
			    "State" : respdatasub[0][0].state_name,
			    "parent_SS_ID":respdatasub[0][0].POSPNo,
			    "Parent_FBA_ID":respdatasub[0][0].parentid,
			    "Sub_Fba_Id":FBAID
			}

			//console.log("***********Log************************");
			//console.log(log);

			wrapper('/api/SubPospEntry','post',{
				"First_Name":respdatasub[0][0].FirsName,
			    "Last_Name" : respdatasub[0][0].LastName,
			    "DOB": SubPospEntryformatDate(respdatasub[0][0].DOB),
			    "Gender" : respdatasub[0][0].Gender,
			    "Mobile":respdatasub[0][0].MobiNumb1,
			    "Mobile2":respdatasub[0][0].MobiNumb2,
			    "EmailId":respdatasub[0][0].EmailID,
			    "Pincode":respdatasub[0][0].PinCode,
			    "City": respdatasub[0][0].City,
			    "State" : respdatasub[0][0].state_name,
			    "parent_SS_ID":respdatasub[0][0].POSPNo,
			    "Parent_FBA_ID":respdatasub[0][0].parentid,
			    "Sub_Fba_Id":FBAID
			},function(datasubpospentry){
				if (isNaN(datasubpospentry)) {
					 // console.log("--------------1------------");
				  //    console.log(datasubpospentry);
				}else{
					var pushdata = [];
					pushdata.push(datasubpospentry);
					pushdata.push(FBAID);
					con.execute_proc('call Update_Sub_Posp_Entry(?,?)',pushdata,function(respdatasubupdate) {
				    console.log("---------------2-----------");
				   // console.log(respdatasubupdate);
					});
				}
			},2);
		}else{
			console.log("This fbaid data not available");
		}
    });
}


function SubPospEntryformatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year ].join('-');
}
module.exports = OneTimePushSubPospEntry;