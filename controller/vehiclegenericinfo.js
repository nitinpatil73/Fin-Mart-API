var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var wrapper = require('./wrapper.js');

var VehicleInfoDetails = function(req, res, next)
{

		var vehicledetaislogpara = [];
	
		con.execute_proc('call getSyncContacts()',vehicledetaislogpara,function(dataresp)
	{
		//console.log(dataresp);
		var fbaidd  = 0;
		for (var k = 0; k < dataresp[0].length; k++) 
		{
        		
        			fbaidd = dataresp[0][k].fbaid;
        			
        				var syncid = dataresp[0][k].id;
        				dataresp[0][k].mobileno = dataresp[0][k].mobileno.replace(/[^0-9]/g, "") ;

						console.log(dataresp[0][k].mobileno);
        		 try {


							wrapper('/api/generic-info?m='+dataresp[0][k].mobileno,'GET',{},function(data)
							{
			
			 					if(data.StatusNo == 0);
			 					{
								try 
								{
				
							  		for (var i = 0; i < data.CustomerDetails.length; i++) 
									{
				 					// console.log(dataresp[0][k]);
                  					//console.log(fbaidd);
									if(data.CustomerDetails[i].Category == 'MOTOR' || data.CustomerDetails[i].Category == 'TWO WHEELER')
	 									 {
								    var add_contact_parameter = [];
	        					
		
        						add_contact_parameter.push(fbaidd);
        						add_contact_parameter.push(data.CustomerDetails[i].VehicleRegNumber);
        						add_contact_parameter.push('NA');
       	 						add_contact_parameter.push(data.CustomerDetails[i].ExpiryDate);
       	 						add_contact_parameter.push(data.CustomerDetails[i].Category);
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
	   	 						add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push(data.CustomerDetails[i].ClaimStatus);
								add_contact_parameter.push('NA');
								add_contact_parameter.push(data.CustomerDetails[i].DOB);
								add_contact_parameter.push(data.CustomerDetails[i].Email);
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('Yes');
								add_contact_parameter.push(data.CustomerDetails[i].InsuranceID);
								add_contact_parameter.push(data.CustomerDetails[i].InsuranceName);
								add_contact_parameter.push(data.CustomerDetails[i].MobileNo);
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push(data.CustomerDetails[i].Name);
								add_contact_parameter.push(data.CustomerDetails[i].Pincode);
								add_contact_parameter.push(data.CustomerDetails[i].PolicyNumber);
								add_contact_parameter.push(data.CustomerDetails[i].Premium);
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push('NA');
								add_contact_parameter.push(data.CustomerDetails[i].QT_Entry_Number);
								add_contact_parameter.push(data.CustomerDetails[i].VehicleRegNumber);
								//console.log('hjhjhjhj');
								//console.log(add_contact_parameter);
								//console.log(data.CustomerDetails[i].Category);
								con.execute_proc('call sp_addmotorleadbyscheduler(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
								 add_contact_parameter,function(dataresponce)
			 						{
		
			 						});		
					 					  }
			
   			    		        }

								}
								catch (ex)
				 		   		{
									console.log(ex);
   									base.send_response("Failure",null,res);	
  			 					}
          
                       		 	}

							},24);

					}
							catch (ex)
							 {
							    console.log(ex);
   								base.send_response("Failure",null,res);	
  	                         }
					//console.log(fbaidd);
					con.execute_proc('call sp_updatesyncstatus(?)',
					syncid,function(dt)
						{
		
						});

		};

base.send_response("Contact Added successfully","Sucess",res);
	});


   //  base.send_response("Contact Added successfully","Sucess",res);	

};



module.exports = {"VehicleInfoDetails":VehicleInfoDetails};
