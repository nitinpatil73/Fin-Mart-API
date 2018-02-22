var DocSchema = require('../model/upload_doc.js');
var multer  = require('multer');
var file;
var storage = multer.diskStorage({
destination: function (req, recieved_file, cb) {
 cb(null, './uploads');
    },
 filename: function (req, recieved_file, cb) {
     var file=recieved_file;
    var originalname = recieved_file.originalname;
    var extension = originalname.split(".");
    filename = Date.now() + '.' + extension[extension.length-1];
    cb(null, filename);
  }
});
var upload = multer({ storage: storage })
class UploadController{};
 UploadController.save=function(req,res){
  var doc = new DocSchema ({
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    destination:req.file.destination,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size
  })
  doc.save(function(err){
    if (err){console.log(err)}
    else {
      res.send('Done');
    }
  })
};
module.exports=UploadController;