const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')

connectToMongo()
const app = express()
app.use(cors(
  {
    origin:["https://mern-notebook-brown.vercel.app"],
    methods:["POST","GET"],
    credentials:true,
    headers: [
      { "key": "Access-Control-Allow-Credentials", "value": "true" },
      { "key": "Access-Control-Allow-Origin", "value": "*" },
      { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
      { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
    ]
  }
))
const port = 5000
app.use(express.json())
app.use('/api/auth',require('./routes/auth') )
app.use('/api/notes',require('./routes/notes') )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})