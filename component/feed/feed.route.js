var router =  require('express').Router();
var feedController = require('./feed.controller');
var uploader = require('./../../middlewares/fileUploader');

router.route('/')
    .post(uploader.single("img"), feedController.insert)
    .get(feedController.find);

router.route('/search')
    .post(feedController.search);    

router.route('/:id')
    .get(feedController.findById)
    .put(uploader.single("img"),feedController.update)
    .delete(feedController.remove);


        
module.exports = router;