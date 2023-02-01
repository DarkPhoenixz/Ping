const express = require('express');
const { createServer } = require("http");
const expr = express();
const httpServer = createServer(expr);
const { Server } = require("socket.io");
const io = new Server(httpServer);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var uri = 'mongodb+srv://MatteoGallina:1234@ping.0mojhpx.mongodb.net/test';


var connectedUsers = [];
io.on("connection", (socket) => {
    console.log("a user connected, socket id: " + socket.id); 
});
  
io.on("disconnect", (socket) => {
    console.log("a user disconnected, socket id: " + socket.id);
});

expr.use(express.static('public'));
expr.use(express.urlencoded({extended: false}));
expr.use(express.json());

const PORT = process.env.PORT || 8000;


httpServer.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT}`);
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var db = client.db("sexibye");
var users = db.collection("users");
var messages = db.collection("messages");

expr.post('/api/sendmsg', (req, res) => {
    console.log(req.body);
    users.find(req.body.src).collection('chatMessages').insertOne({
        src: req.body.src,
        dest: req.body.dest,
        message: req.body.message,
        id: req.body.id,
        timestamp: req.body.timestamp
    });
    io.to(req.body.id).emit('chatmessage', req.body)
    res.send('sent');
});

expr.post('/api/checkNewUser/', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let flag = false;
    console.log('searching for user ' + username)
    users.find({email: email}).toArray().then((result) => {
        if (result.length > 0) {
            console.log('another account with same mail')
            res.send("email found");
            
        } 
        else {
            users.find({username: username}).toArray().then((result) => {
                if (result.length > 0) {
                    console.log('user ' + username + ' found')
                    res.send("username found"); 
                    
                }
                else {
                    console.log('user ' + username + ' does not exist, creating new user')
                    users.insertOne({username: username, email: email, password: password});
                    res.send("added");
                }
            });
        }

    });        
});

expr.post('/api/checkUser/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username.includes("@")) {
        users.find({email: username, password: password}).toArray().then((result) => {
            if (result.length > 0) {
                console.log('user ' + username + ' found')
                res.send("login");
            }
            else {
                console.log('user ' + username + ' not found')
                res.send("retry");
            }
        });
    }
    else {
        users.find({username: username, password: password}).toArray().then((result) => {
            if (result.length > 0) {
                console.log('user ' + username + ' found')
                res.send("login");
            }
            else {
                console.log('user ' + username + ' not found')
                res.send("retry");
            }
        });
    }
    
});

expr.get('/api/searchUser/:text', (req, res) => {
    username = req.params.text;
    users.find({username: new RegExp(username, 'i')}).toArray().then((result) => {
        res.send(result);
    });
    
});

function getOnlineUsers(){
    
    connectedUsers.forEach(element => {
        console.log(element.id + " " + element.name + " " + element.status);
    });
    if (connectedUsers.length > 0) {
        io.emit('onlineUsers', connectedUsers)
    }
    else {
        res.send("none");
    }

}

function checkOffline(){
    console.log("checking offline users")
    console.log(connectedUsers);
    connectedUsers.forEach(element => {
        if (element.status == "online") {
            io.to(element.id).emit("checkOnlineStatus");
            io.on("online", (username) => {
                connectedUsers.forEach(element => {
                    if (element.name == username) {
                        element.status = "online";
                        return;
                    }
                    else {
                        element.status = "offline";
                    }
                });
            });
            
        }
    });

}

//setInterval(() => {checkOffline();}, 10000);