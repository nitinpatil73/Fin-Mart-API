class HandelerController{};

HandelerController.validateimage = function (req, percent) {	
	//console.log(percent);
	if(percent ==null){
		return null;
	}
	else{
		var image ="http://"+ req.headers.host + "/images/progress/"+ percent + ".png";
		//console.log(image);
		return image;
	}
};

module.exports=HandelerController;