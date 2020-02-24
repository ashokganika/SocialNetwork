var router = require('express').Router();
var userModel = require('./../models/user.model');
var mapUser = require('./../helpers/mapUser');
var authrorize = require('./../middlewares/authorize');

router.route('/')
    .get(function(req, res, next) {
        // console.log(req.loggedInUser);
        userModel
        .find({})
        .sort({_id:-1})
        .limit(5)
            .then(function(data) {
                res.status(200).json(data);
            })
            .catch(function(err) {
                next(err);
            })
    });

router.route('/:id')
    .get(function(req, res, next) {
        userModel.findById({_id: req.params.id})
            .exec(function(err, user) {
                if(err){
                    return next(err);
                }
                if(!user){
                    return next({
                        msg: 'The user does not exist'
                    });
                }
                else{
                    res.status(200).json(user);
                }
            });
    })

    .put(function(req, res, next) {
        userModel.findById({_id: req.params.id})
            .exec(function(err, user) {
                if(err){
                    return next(err);
                }
               if(user){
                   var MappedUser = mapUser(user, req.body)
                    MappedUser.save()
                        .then(function(data){
                            res.status(200).json(data);
                        })
                        .catch(function(err){
                            next(err);
                        })       
               }     
               else{
                   next({
                       msg:"User Not Found"
                   })
               }    
            });
    })
    
    .delete(authrorize, function(req, res, next) {
        userModel.findById({_id: req.params.id})
        .exec(function(err, user) {
            if(err){
                return next(err);
            }
            if(!user){
                return next({
                    msg:"No such User exists"
                });
            }
            else{
               user.remove(user, function(err, done) {
                   if(err){
                       return next(err);
                   }
                   res.status(200).json(done);
               });
            }
        });
    });
    
    

    


module.exports = router;    
