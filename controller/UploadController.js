var fs=require('fs');
var con=require('../bin/dbconnection.js');
var base = require('./baseController');
var store_path='./public/uploads';
class UploadController{};
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
UploadController.save=function(req,res){
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
  console.log("before" )
  var upload = multer({ storage: storage }).single('DocFile')
  upload(req, res, function (err) {
    //console.log("uploading....")
      if (err) {
        // An error occurred when uploading
        base.send_response("Upload failed due to Fatal Error",null,res);
        //throw err;
      }
      var path = require( 'path' )
      var fbaid=req.body.FBAID;
      fbaid=fbaid.replaceAll('"',"");
      var filename=(req.file.filename).replaceAll('"',"");
      var destination = store_path+"/"+ fbaid+"/"+filename;
      var DocName=(req.body.DocName).replaceAll('"',"")
      var RBID=req.body.RBID?req.body.RBID.replaceAll('"',""):0;
      var PBID=req.body.PBID?req.body.PBID.replaceAll('"',""):0;
      var source=store_path+"/"+filename;
      var DocType=(req.body.DocType).replaceAll('"',"")
      //console.log(source);
      //console.log(destination);

      //make a folder with fbaid in current folder and move file with new name as docType
       move(source,fbaid,DocName,function(err){
         //console.log("-------------------------------moved")
         if(err)
           base.send_response("Upload failed",null,res);
         else
           {
                     var extension = source.split(".");
                    newFilePath="uploads/"+fbaid+"/"+DocName+"."+extension[extension.length-1];
                    var doc_param=[];
                    doc_param.push(fbaid);
                    doc_param.push(DocName);
                    doc_param.push(RBID);
                    doc_param.push(PBID);
                    doc_param.push(newFilePath);
                    //console.log("proc calling")
                    con.execute_proc('call upload_doc(?,?,?,?,?)',doc_param,function(data) {
                      //console.log("proc called=--------")
                        if(data!=null){
                             // prv_file=data[0][0].prv_file
                             // if(prv_file){
                             //   //console.log(store_path+"/"+prv_file);
                               
                             //    fs.unlink(store_path+"/"+prv_file, (err) => {
                             //        if (err) throw err;
                             //        var RBLog  = require('../model/RBUpdateLoanLog.js');
                             //        console.log(store_path+"/"+prv_file+' was deleted');
                             //      });
                             // }

                            base.send_response("Success",data[0],res);
                        }else{
                            base.send_response("Upload failed",null,res);
                        }
                
                
                  
               })
              
           }
           
       })
      ////console.log(req.file);

      // Everything went fine
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
module.exports=UploadController;