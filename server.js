require('dotenv').config()
const express = require('express')
const mongose = require('mongoose')
const cors = require('cors')
const path = require('path');
const fileupload = require('express-fileupload')

const apiRoutes = require('./src/routes/routes')

mongose.connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongose.Promise = global.Promise
mongose.connection.on('error',(error => {
    console.log("Error: ", error.message)
}))


const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(fileupload())

server.use(express.static(path.join(__dirname)));

server.use('/', apiRoutes)

server.listen(process.env.PORT, ()=>{
    console.log(`Rodando no endereço: ${process.env.BASE}`)
})