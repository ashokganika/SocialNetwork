var jwt = require('jsonwebtoken');
var configs = require('./../configs/index');
var userModel = require('./../models/user.model');

module.exports = function(req, res, next){
    var token;
    if(req.headers['token']){
        token = req.headers.token;
    }
    if(req.headers['authorization']){
        token = req.headers['authorization'];
    }
    if(req.headers['x-access-token']){
        token = req.headers['x-access-token'];
    }
    if(token){
        jwt.verify(token, configs.secretKey, function(err, decoded){
            if(err){
                return next(err);
            }
            console.log(decoded);
            userModel.findById(decoded.id)
                .exec(function(err, user) {
                    if(err){
                        return next(err);
                    }
                    if(user){
                        req.loggedInUser = user;
                        next();
                    }
                    else{
                        return next({
                            msg: "User removed from system"
                        })
                    }
                })
            
        })
    }
    else {
        next({
            msg: "token not provided"
        });
    }
}


