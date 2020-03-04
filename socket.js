const express = require('express');
const app = express();

const io = require('socket.io')(app.listen(8081, function(err, done){
    if(err){
        console.log("err ", err);
    }
    else{
        console.log("Listeining socket in port 8081");
    }
}))


var user = [];
io.on('connection', function(client){
    var id = client.id;
    console.log("client connected to socket...");
    console.log(client.id);
    client.on('new-msg', function(data){
        console.log(data);
        client.emit('reply-msg-own', data);
		client.broadcast.to(data.receiverId).emit('reply-msg', data);
    })
    client.on('new-user', function(user_name){
        user.push({
            username:user_name,
            id:id
        })
        client.emit('send-user', user);
        client.broadcast.emit('send-user', user);
    })
    client.on('disconnect', function(){
        console.log("client dsiconnected............");
        user.forEach(function(item, i){
            if(item.id === id){
                user.splice(i,1);
            }
        });
        client.emit('send-user', user);
        client.broadcast.emit('send-user', user);
    });
})
