"use strict";

var success_response = function(data,Message,callback) {
	var response =  {Message:Message,Status:'success',StatusNo:0,MasterData:data};
	callback(response);

};

var failure_response = function(data,Message,callback) {
	var response =  {Message:Message,Status:'failure',StatusNo:1,MasterData:data};
	callback(response);
};

module.exports = {'success_response':success_response,'failure_response':failure_response};