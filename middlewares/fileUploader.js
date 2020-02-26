var multer = require('multer');
var path = require('path');

var storeConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads/images'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

var uploader = multer({
    storage: storeConfig,
    fileFilter: function(req, file, cb) {
        var mimeType = file.mimetype.split('/')[0];
        if(mimeType == 'image'){
            cb(null, true);
        }
        else {
            req.fileError = true;
            cb(null, false);
        }
    }
});


module.exports = uploader;