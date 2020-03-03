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

function find(condtion, pageSize, pageNumber) {
    var perPage = pageSize || 100;
    console.log(perPage);
    var pageItems = ((pageNumber - 1) || 0) * perPage;
    console.log(pageItems);
    return feedModel.find(condtion)
        .populate('user',{name:1,email:1, role:1})
        .limit(Number(perPage))
        .skip(pageItems)
        .sort({_id:-1}); 
}

function update(id, data){
    return new Promise(function(resolve, reject){
        feedModel.findById(id)
        .exec(function(err, feed){
            if(err){
                reject(err);
            }
            if(feed){
                var oldImg = feed.image;
                var updateFeed = mapFeed(feed, data);
                updateFeed.save(function(err, done){
                    if(err){
                        reject(err);
                    }
                    else {
                        resolve({oldImg,done});
                    }
                })
            }
            else{
                reject({msg:"No such feed"})
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