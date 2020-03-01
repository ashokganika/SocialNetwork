var fs = require('fs');
var path = require('path');
var feedQuery = require('./feed.query');

function insert(req, res, next) {
    // console.log(req.body);
    // console.log(req.file);
    var data = req.body;
    data.user = req.loggedInUser._id;
    if(req.fileError){
        return next({
            msg: "invalid file format"
        })
    }
    if(req.file){
        data.image = req.file.filename;
    }
    feedQuery.insert(data)
        .then(function(data) {
            res.status(200).json(data);
        })
        .catch(function(err){
            next(err);
        })
}


function find(req, res, next) {
    var condition = {};
    // console.log(req.loggedInUser);
    condition.user = req.loggedInUser._id;
    feedQuery.find(condition)
        .then(function(data){
            res.status(200).json(data);
        })
        .catch(function(err) {
            next(err);
        })
}

function findById(req, res, next) {
    var condition = {_id: req.params.id};
    feedQuery.find(condition)
        .then(function(data){
            if(data.length)
                res.status(200).json(data[0]);
            else
                next({
                    msg: "User doesnot exists"
                })    
        })
        .catch(function(err) {
            next(err);
        })
}

function search(req, res, next) {
    var condition = {};
    if(req.body.title){
        condition.title = req.body.title;
    }
    feedQuery.find(condition, req.query.pageSize, req.query.pageNumber)
        .sort({_id:-1})
        .then(function(data){
            if(data.length)
                res.status(200).json(data);
            else
                next({
                    msg: "No such feed found"
                })    
        })
        .catch(function(err) {
            next(err);
        })
}

function update(req, res, next) {
    console.log("update value.....", req.body);
    if(req.fileError){
        return next({
            msg: "invalid file format"
        })
    }
    console.log(req.file);
    if(req.file){

        req.body.image = req.file.filename;
    }
    feedQuery.update(req.params.id, req.body)
        .then(function(data){
            if(req.file){
                fs.unlink(path.join(process.cwd() , 'uploads/images/' , data.oldImg), function(err, done){
                    if(err){
                        consolelog("not remove", err);
                    }
                    else {
                        console.log("removed", done);
                    }
                })
            }
            res.status(200).json(data.done);
        })
        .catch(function(err){
            next(err);
        })
}

function remove(req, res, next) {
    feedQuery.remove(req.params.id)
        .then(function(data) {
            if(data){
                fs.unlink(path.join(process.cwd(), 'uploads/images', data.image), function(err, done){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(done);
                    }
                });
                res.status(200).json(data);
            }    
            else
                next({msg:'Feed does not exists'});    
        })
        .catch(function(err) {
            next(err);
        })
}

module.exports = {
    insert,
    find,
    findById,
    search,
    update,
    remove
}