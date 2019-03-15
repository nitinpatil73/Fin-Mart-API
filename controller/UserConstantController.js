var con=require('../bin/dbconnection.js');
var base = require('./baseController');

var UserConstant = function(req,res,next){
	var ran_no = Math.floor(Math.random() * (9999 - 1111)) + 9999;
	//console.log("----------------");
	//console.log(ran_no);
	con.execute_proc('call user_costant(?)',req.body.fbaid,function(data){
		console.log("---------------");
		console.log(data[0][0].Status);
		if(data[0][0].Status != '1'){
			if(data[0][0].pospselfphoto != null && data[0][0].pospselfphoto != ''){
        		data[0][0].pospselfphoto = "http://"+ req.headers.host + "/" + data[0][0].pospselfphoto + "?" + ran_no;
        		data[0][0].pospsendphoto = "http://"+ req.headers.host + "/" + data[0][0].pospsendphoto + "?" + ran_no;
	        }
	        if(data[0][0].loanselfphoto != null && data[0][0].loanselfphoto != ''){
	        	data[0][0].loanselfphoto = "http://"+ req.headers.host + "/"+  data[0][0].loanselfphoto + "?" + ran_no;
	        	data[0][0].loansendphoto = "http://"+ req.headers.host + "/"+  data[0][0].loansendphoto + "?" + ran_no;
	        }

	        if(data[0][0].pospparentphoto != null && data[0][0].pospparentphoto != ''){
        		data[0][0].pospparentphoto = "http://"+ req.headers.host + "/" + data[0][0].pospparentphoto + "?" + ran_no;
	        }
	        if(data[0][0].loanparentphoto != null && data[0][0].loanparentphoto != ''){
	        	data[0][0].loanparentphoto = "http://"+ req.headers.host + "/"+  data[0][0].loanparentphoto + "?" + ran_no;
	        }

	    	if(process.env.NODE_ENV == 'development'){   
				data[0][0].serviceurl = "http://bo.mgfm.in/get_service/"+ data[0][0].FBAId; 
			}
			else{
				data[0][0].serviceurl = "http://bo.magicfinmart.com/get_service/"+ data[0][0].FBAId;
			} 
			
	        if(process.env.NODE_ENV == 'development'){
				if(data[0][0].POSPNo != null && data[0][0].POSPNo != ''){
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
						data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}
				}else{
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
					    data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}	
				}
			 }else{
				if(data[0][0].POSPNo != null && data[0][0].POSPNo != ''){
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
						data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}
				}else{
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
					    data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}
				}
			}

//Temp Health URL

            if(process.env.NODE_ENV == 'development'){
				if(data[0][0].POSPNo != null && data[0][0].POSPNo != ''){
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}
				}else{
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}
				}
			}else{
				if(data[0][0].POSPNo != null && data[0][0].POSPNo != ''){
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}
				}else{
					if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].parentid+"&sub_fba_id="+data[0][0].FBAId;
					}else{
						data[0][0].healthurltemp = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].FBAId+"&sub_fba_id="+data[0][0].parentid;
					}
				}
			}
			if(data[0][0].POSPNo != null && data[0][0].POSPNo != ''){
				data[0][0].messagesender = "http://d3j57uxn247eva.cloudfront.net/Health_Web/sms_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].FBAId;
			}
			
			if(data[0][0].POSPNo != null && data[0][0].POSPNo != ''){
				if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
					data[0][0].PBByCrnSearch = "http://d3j57uxn247eva.cloudfront.net/FM/download_policy.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].parentid;
				}else{
					data[0][0].PBByCrnSearch = "http://d3j57uxn247eva.cloudfront.net/FM/download_policy.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].FBAId;
				}
			}else{
				if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
					data[0][0].PBByCrnSearch = "http://d3j57uxn247eva.cloudfront.net/FM/download_policy.html?ss_id=5&fba_id="+data[0][0].parentid;
				}else{
					data[0][0].PBByCrnSearch = "http://d3j57uxn247eva.cloudfront.net/FM/download_policy.html?ss_id=5&fba_id="+data[0][0].FBAId;
				}
			}

			if(data[0][0].POSPNo != null && data[0][0].POSPNo != ''){
				if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
					data[0][0].HealthDemoUrl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].parentid+"&ip_address=0.0.0.0&app_version=2.2.0&mobile_no=9999999999&sub_fba_id="+data[0][0].FBAId;
				}else{
					data[0][0].HealthDemoUrl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id="+data[0][0].POSPNo+"&fba_id="+data[0][0].FBAId+"&ip_address=0.0.0.0&app_version=2.2.0&mobile_no=9999999999&sub_fba_id="+data[0][0].parentid;
				}
			}else{
				if(data[0][0].parentid != null && data[0][0].parentid != '' && data[0][0].parentid != '0'){
					data[0][0].HealthDemoUrl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].parentid+"&ip_address=0.0.0.0&app_version=2.2.0&mobile_no=9999999999&sub_fba_id="+data[0][0].FBAId;
				}else{
					data[0][0].HealthDemoUrl = "http://d3j57uxn247eva.cloudfront.net/Health_Web/quote_list.html?ss_id=5&fba_id="+data[0][0].FBAId+"&ip_address=0.0.0.0&app_version=2.2.0&mobile_no=9999999999&sub_fba_id="+data[0][0].parentid;
				}
			}

			base.send_response("Success",data[0][0],res);
		}else{
			base.send_response("FBAID does not exits.",null,res);
		}
	});
};

module.exports = {"UserConstant":UserConstant};