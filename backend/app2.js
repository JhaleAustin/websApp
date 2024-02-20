const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const recordModel =require('./models/recordCollection')

const app = express()
app.use(cors())
app.use(express.json());
 
mongoose.connect( "mongodb+srv://growthplant:growthplant@cluster0.ovsw7ap.mongodb.net/growthplant?retryWrites=true&w=majority"
).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
})
app.listen(3001,()=>{
    console.log("server is running")
})
app.get("/getUser",(req,res)=>{
    recordModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err){
        res.json(err)
    })
})
app.post("/createUser",async (req,res)=>{
    const record = req.body; 
    const newUser = new recordModel(record);
    await newUser.save()
    res.json(record);
})