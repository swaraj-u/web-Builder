const express= require('express');
const http = require("http");
const dotenv= require('dotenv');
const connectDB = require('./config/db');
const { Server } = require("socket.io");
const cors = require("cors");

dotenv.config();
connectDB();

const app=express();
app.use(cors());

//Creating http server using express
const server = http.createServer(app);

//Setting up socket.io with cors
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // origin of front-end (REACT)
        method: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on("addTask", (data) => {
        socket.broadcast.emit("receiveTask", data );
    });



});

const PORT = process.env.PORT || 5000;
server.listen(5000,console.log(`Server started on ${PORT}`));

