const express= require('express');
const dotenv= require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const app=express();
const PORT = process.env.PORT || 5000;
app.listen(5000,console.log(`Server started on ${PORT}`));

app.get('/',(req,res)=>{
    res.send('Api is running!');
});
