module.exports = function(req, res, next) {
    if(req.loggedInUser.role === 1){
        next();
    }
    else {
        next({
            msg:"you do not have the permission"
        })
    }
}