const express= require('express');
const http = require("http");
const dotenv= require('dotenv');
const connectDB = require('./config/db');
const { Server } = require("socket.io");
const cors = require("cors");
const Task = require("./models/Task");
const mongoose = require("mongoose");

dotenv.config();
connectDB();

const app=express();
//Creating http server using express
const server = http.createServer(app);


//Setting up socket.io with cors
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // origin of front-end (REACT)
        method: ["GET", "POST"],
    },
});

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));



io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    // const task = 'hel'; 
// socket.emit('addTask', { task });
    // Send existing tasks when a new client connects
    Task.find().then((tasks) => {
        socket.emit("allTasks", tasks);
    });

    // Listen for "addTask" event
    socket.on("addTask", async (data) => {
        const newTask = new Task({ task: data.task });
        await newTask.save(); // Save task to database

        // Broadcast the new task to all clients
        Task.find().then((tasks) => {
            io.emit("allTasks", tasks); // Emit all tasks to all clients
        });
    });



});

const PORT = process.env.PORT || 5000;
server.listen(5000,console.log(`Server started on ${PORT}`));

