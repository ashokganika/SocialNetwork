var router = require('express').Router();
var userModel = require('./../models/user.model');
var mapUser = require('./../helpers/mapUser');
var hashPassword = require('password-hash');


router.route('/register')
    .post(function(req, res, next) {
       var newUser = new userModel({});
        var mappedUser = mapUser(newUser, req.body);
        mappedUser.password = hashPassword.generate(req.body.password);
        mappedUser.save(function(err, done) {
            if(err) {
                return next(err);
            }
            res.status(200).json(done);
        });
    });

router.route('/login')
    .post(function(req, res, next) {
        // console.log(req.body.username);
        userModel.findOne({
            $or:[
                {
                    username: req.body.username
                },
                {
                   email: req.body.username 
                }
            ]
        })
            .exec(function(err, user){
                if(err){
                    return next(err);
                }
                if(user){
                     var isPasswordMatch = hashPassword.verify(req.body.password, user.password) 
                     if(isPasswordMatch){
                         res.status(200).json(user);
                     }
                     else{
                         return next({
                             msg:"Password did not match"
                         })
                     }
                }
                else{
                    next({
                        msg: "Invalid email or username"
                    })
                }
            })
            
    });    

module.exports = router;