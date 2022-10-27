require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")
const connection = require("./db")
const userRoutes = require("./routes/userroutes")
const authRoutes = require("./routes/adminroutes")

////database conenction
connection()

//// middleware
app.use(express.json())
app.use(cors())

/////routes

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
////adding port
const port = process.env.PORT || 8080 ; 
/////starting app
app.listen(port , ()=>console.log('listening on '+port))
