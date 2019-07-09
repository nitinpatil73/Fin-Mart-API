var fs=require('fs');
// var con=require('../bin/dbconnection.js');
// var base = require('./baseController');
var store_path='./public/demo';

var FileUploadBFAID = function(req, res, next){
	res.render('fileupload');
};

class FileUploadBFAIDSave{};
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
FileUploadBFAIDSave.save=function(req,res){
  var multer  = require('multer');

  var storage = multer.diskStorage({
    destination: function (req, recieved_file, cb) {

     cb(null, store_path);
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
        base.send_response("Upload failed due to Fatal Error",null,res);
      }
      var path = require( 'path' )
      var fbaid='123';
      fbaid=fbaid.replaceAll('"',"");
      var filename=(req.file.userfile).replaceAll('"',"");
      var destination = store_path+"/"+ fbaid+"/"+filename;
      var DocName=('testn').replaceAll('"',"")
      var RBID='12'.replaceAll('"',""):0;
      var PBID='123'.replaceAll('"',""):0;
      var source=store_path+"/"+filename;
      var DocType=('uyt').replaceAll('"',"")

       move(source,fbaid,DocName,function(err){
         if(err)
           base.send_response("Upload failed",null,res);
         else
           {
               //       var extension = source.split(".");
               //      newFilePath="uploads/"+fbaid+"/"+DocName+"."+extension[extension.length-1];
               //      var doc_param=[];
               //      doc_param.push(fbaid);
               //      doc_param.push(DocName);
               //      doc_param.push(RBID);
               //      doc_param.push(PBID);
               //      doc_param.push(newFilePath);
               //      con.execute_proc('call upload_doc(?,?,?,?,?)',doc_param,function(data) {
               //          if(data!=null){
               //              var ran_no = Math.floor(Math.random() * (9999 - 1111)) + 9999;
               //              data[0][0].prv_file = "http://"+ req.headers.host +  "/" + data[0][0].prv_file + "?" + ran_no;
               //              base.send_response("Success",data[0],res);
               //          }else{
               //              base.send_response("Upload failed",null,res);
               //          }
               // })
              
           }
           
       })
  })}
function move(oldPath, fbaid,newname,cb) {

    
    
    ensureExists(store_path+"/"+fbaid, 0777, function(err) {
        if (err) // handle folder creation error
          cb(err);
        else // we're all good
        {    
          getNewName(oldPath,newname,fbaid,function(newFilePath){
            fs.rename(oldPath, newFilePath, (err) => {
            if (err) 
              cb(err);
            //console.log('Rename complete!');
            cb();
            });
          })
          
        }
    });

};
function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}
function getNewName(oldPath,newname,fbaid,cb){
   var extension = oldPath.split(".");
   filename = newname + '.' + extension[extension.length-1];
   newFilePath=store_path+"/"+fbaid+"/"+filename;
   cb(newFilePath);
}

module.exports = {"FileUploadBFAID":FileUploadBFAID,"FileUploadBFAIDSave":FileUploadBFAIDSave};