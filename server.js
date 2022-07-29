const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3001;

//Call socket io
const { Server } = require("socket.io");
// const io = new Server(server);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

// Một số cách gửi dữ liệu của server qua client

// 1. Gửi cho chính họ
//socket.emit('name', data);

// 2. Gửi qua cho một người khác
//id người nhận, dữ liệu
//io.to(id).emit('name', data);

// 3. Gửi cho những người khác, trừ client gửi
//socket.broadcast.emit('name', data);

// 4. Gửi cho tất cả
//io.sockets.emit('name', data);

//danh sach online
// var array = [];

//Kiem tra ket noi
io.on("connection", (socket) => {
  console.log(socket.id + " online");

  socket.on('angular', (data) => {
    console.log(data)
    socket.emit('nodejs', "Xin chào Angular")
  })

  //tat ket noi
  socket.on("disconnect", () => {
    console.log(socket.id + " offline");
  });

});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
