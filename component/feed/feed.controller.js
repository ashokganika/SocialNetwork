var feedQuery = require('./feed.query');

function insert(req, res, next) {
    var data = req.body;
    data.user = req.loggedInUser._id;
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
    feedQuery.find(condition)
        .sort({_id:-1})
        .then(function(data){
            if(data.length)
                res.status(200).json(data);
            else
                next({
                    msg: "No such user found"
                })    
        })
        .catch(function(err) {
            next(err);
        })
}

function update(req, res, next) {
    feedQuery.update(req.params.id, req.body)
        .then(function(data){
            res.status(200).json(data);
        })
        .catch(function(err){
            next(err);
        })
}

function remove(req, res, next) {
    feedQuery.remove(req.params.id)
        .then(function(data) {
            if(data)
                res.status(200).json(data);
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