const express = require('express');
const { createServer } = require('node:http');
const path = require("path");
const {Server} = require('socket.io');

const app = express();
const server = createServer(app);
app.use(express.static(path.resolve("./public")));

const io = new Server(server);
// handle all the websocket requests
// socket.io
// socket parameter is a client(information of the client)
// io means all my connections
// socket means only one client/user
io.on('connection', (socket)=>{
    console.log("A new user is Connected:", socket.id);
    // message coming from the frontend 
    socket.on("client-message",message =>{
        // console.log("A new user message: ",message);
        // give message to all users
        io.emit("server is sending the message:",message);
    })
})

app.get('/', (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});