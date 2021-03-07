const express = require('express')
const app = express()
const mongoose = require('mongoose')

//connexion database to the server 
const MONGO_URI = "mongodb+srv://Marwen_user:Marwen_user@cluster0.nzlyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//parse the data 
app.use(express.json())

app.use('/persons',require('./Routes/personRoutes'))
mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
  err ? console.log(err) : console.log("The data base is connected") 
})

const port = 5000; 
app.listen(port,(err)=>{
  err ? console.log(err) : console.log(`The server is running on port ${port}`)
})