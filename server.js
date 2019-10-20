var express = require('express')
var app = express()
const path = require('path')

app.use(express.static('client'))
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

const port = 3000
app.listen(port,()=>{
    console.log(`connected to http://localhost:${port}`)
})