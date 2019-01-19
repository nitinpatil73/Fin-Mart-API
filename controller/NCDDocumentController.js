var fs=require('fs');
var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var store_path='./public/ncd';
class NCDDocumentController{};
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

NCDDocumentController.save=function(req,res){
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
      var guid=req.body.guid;
      console.log(guid);
      guid=guid.replaceAll('"',"");
      var filename=(req.file.filename).replaceAll('"',"");
      var destination = store_path+"/"+guid+"/"+filename;
      //var DocName=(req.body.DocName).replaceAll('"',"")
      var DocName = new Date().getTime();
      var source=store_path+"/"+filename;
      var DocType=(req.body.DocType).replaceAll('"',"")
       move(source,guid,DocName,function(err){
         if(err)
           base.send_response("Upload failed",null,res);
         else
           {
              var extension = source.split(".");
              newFilePath="ncd/"+guid+"/"+DocName+"."+extension[extension.length-1];
              var doc_param=[];
              doc_param.push(DocName);
              doc_param.push(newFilePath);
              doc_param.push(guid);
              doc_param.push(DocType);            
              
              con.execute_proc('call ncdfbadocumentupload(?,?,?,?)',doc_param,function(data) {
                if(data!=null){
                    var ran_no = Math.floor(Math.random() * (9999 - 1111)) + 9999;
                    data[0][0].prv_file = "http://"+ req.headers.host +  "/" + data[0][0].prv_file + "?" + ran_no;
                    base.send_response("Success",data[0],res);
                }else{
                    base.send_response("Upload failed",null,res);
                }
              })
            }  
       })
  })}
function move(oldPath, quoteid,newname,cb) {
    ensureExists(store_path+"/"+quoteid, 0777, function(err) {
        if (err) // handle folder creation error
          cb(err);
        else // we're all good
        {    
          getNewName(oldPath,newname,quoteid,function(newFilePath){
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
function getNewName(oldPath,newname,quoteid,cb){
   var extension = oldPath.split(".");
   filename = newname + '.' + extension[extension.length-1];
   newFilePath=store_path+"/"+quoteid+"/"+filename;
   cb(newFilePath);
}
module.exports=NCDDocumentController;



