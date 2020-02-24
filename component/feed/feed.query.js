var feedModel = require('./feed.model');

function mapFeed(original, newFeed){
    if(newFeed.title)
        original.title = newFeed.title
    if(newFeed.description)
        original.description = newFeed.description
    if(newFeed.image)
        original.image = newFeed.image
    if(newFeed.user)
        original.user = newFeed.user

    return original;
}

function insert(data) {
    var newFeed = feedModel({});
    var mappedFeed = mapFeed(newFeed, data);
     return mappedFeed.save();
}

function find(condtion) {
    return feedModel.find(condtion)
        .populate('user',{name:1,email:1, role:1}); 
}

function update(id, data){
    return new Promise(function(resolve, reject){
        feedModel.findById(id)
        .exec(function(err, user){
            if(err){
                reject(err);
            }
            if(user){
                var updateUser = mapFeed(user, data);
                updateUser.save(function(err, done){
                    if(err){
                        reject(err);
                    }
                    else {
                        resolve(done);
                    }
                })
            }
            else{
                reject({msg:"No such user"})
            }
        })
    })      
   
}

function remove(id){
    return feedModel.findByIdAndRemove(id);
}


module. exports = {
    insert,
    find,
    update,
    remove
}