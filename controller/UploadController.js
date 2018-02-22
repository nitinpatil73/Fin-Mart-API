
var con=require('../bin/dbconnection.js');
var base = require('./baseController');
class UploadController{};
      UploadController.save=function(req,res){
      var multer  = require('multer');

      var storage = multer.diskStorage({
      destination: function (req, recieved_file, cb) {
        //console.log(req);
       cb(null, './uploads');
          },
       filename: function (req, recieved_file, cb) {

          var originalname = recieved_file.originalname;
          var extension = originalname.split(".");
          filename = Date.now() + '.' + extension[extension.length-1];
          cb(null, filename);
        }
      });
      var upload = multer({ storage: storage }).single('DocFile')
      upload(req, res, function (err) {
          if (err) {
            // An error occurred when uploading
            base.send_response("Upload failed due to Fatal Error",null,res);
            //throw err;
          }
          ////console.log(req.file);
          var doc_param=[];
          doc_param.push(req.body.FBAID);
          doc_param.push(req.body.DocType);
          doc_param.push(req.body.RBID?req.body.RBID:0);
          doc_param.push(req.body.PBID?req.body.PBID:0);
          doc_param.push(req.file.filename);

          con.execute_proc('call upload_doc(?,?,?,?,?)',doc_param,function(data) {
            //res.send(data);
              if(data!=null){
                base.send_response("Success",data[0],res);
              }else{
                  base.send_response("Upload failed",null,res);
              }
              
              
          })
          // Everything went fine
    })

};
module.exports=UploadController;