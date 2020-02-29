const express = require('express')

const port = 3000;
const app = express()

app.get('/',(req,res)=>{
    console.log('hi')
})

app.listen(port,()=>{
    console.log('listen on port :',port)
})