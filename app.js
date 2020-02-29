const express = require('express')
const mongoose = require('mongoose')
const port = 3000;
const app = express()
const Todo = require('./model/todo')

mongoose.connect('mongodb://localhost/Todo', { useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',(err)=>{
    console.log('db error:',err)
})
db.once('open',()=>{
    console.log('db connected')
    app.listen(port,()=>{
        console.log('listen on port :',port)
    })
})

app.get('/',(req,res)=>{
    console.log('hi')
})
