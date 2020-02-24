var router =  require('express').Router();
var feedController = require('./feed.controller');


router.route('/')
    .post(feedController.insert)
    .get(feedController.find);

router.route('/search')
    .post(feedController.search);    

router.route('/:id')
    .get(feedController.findById)
    .put(feedController.update)
    .delete(feedController.remove);


        
module.exports = router;