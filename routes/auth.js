var router = require('express').Router();
var userModel = require('./../models/user.model');
var mapUser = require('./../helpers/mapUser');
var hashPassword = require('password-hash');
var jwt = require('jsonwebtoken');
var configs = require('./../configs/index');
var nodeMailer = require('nodemailer');
const randomString = require('random-string');

var sender = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'water22drop@gmail.com',
        pass: 'ashok22ganika'
    }
});

function prepareEmail(data) {
    let mailData = {
        from: 'Brodway News Portal 👻 <noreply@brodwaynews.com>', // sender address
        to: data.email, // list of receivers
        subject: "Forgot Password ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <p>Hi <strong>${data.name},</strong></p>
        <p>We noticed that youa re having trouble logging into our system,please use the link below to reset your password</p>
        <p><a href="${data.link}">click here</a></p>
        <p>If you have not requested to reset your password kindly ignore this email</p>
        <p>Regards,</p>
        <p>Nrodway News Team</p>`// html body

    }
    return mailData;
}

function generateToken(data) {
    var token = jwt.sign({id:data._id}, configs.secretKey);
    return token;
}

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
                        res.status(200).json({user, token:generateToken(user)});
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
    
    router.post('/forgot-password', function (req, res, next) {
        userModel.findOne({
            email: req.body.email
        })
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next({
                        msg: "Your Email Adress doesnot exist"
                    })
                }
                // user is here
                var randomToken = randomString({ length: 25 });
                var passwordResetExpiryTime = Date.now() + 1000 * 60 * 60 * 24;
                var mailData = {
                    name: user.username,
                    email: user.email,
                    link: `${req.headers.origin}/reset-password/${randomToken}`
                }
                var mailContent = prepareEmail(mailData);
                sender.sendMail(mailContent, function (err, done) {
                    if (err) {
                        return next(err);
                    }
                    user.passwordResetToken = randomToken;
                    user.passwordResetTokenExpiry = passwordResetExpiryTime;
                    user.save(function (err, done) {
                        if (err) {
                            return next(err);
                        }
                        res.json(done);
                    })
                    // res.json(done);
                })
    
            })
    })
    
    router.post('/reset-password/:token', function (req, res, next) {
        var token = req.params.token;
        userModel.findOne({
            passwordResetToken: token,
            passwordResetTokenExpiry: {
                $gte: Date.now()
            }
        })
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next({
                        msg: "Password reset Token is Invalid or expired"
                    });
                }
                console.log('check expirty value >>', new Date(user.passwordResetTokenExpiry).getTime() > Date.now());
                // if (new Date(user.passwordResetTokenExpiry).getTime() < Date.now()) {
                //     return next({
                //         msg: "Password reset Token Expired"
                //     })
                // }
                user.password = passwordHash.generate(req.body.password);
                user.passwordResetToken = null;
                user.passwordResetTokenExpiry = null;
                user.save(function (err, done) {
                    if (err) {
                        return next(err);
                    }
                    res.json(done);
                })
            })
    })
    
    module.exports = router;

module.exports = router;