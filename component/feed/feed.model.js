var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    image:String,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},
{
    timestamps:true
});


var feedModel = mongoose.model('feed', feedSchema);

module.exports = feedModel;