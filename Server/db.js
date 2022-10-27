const mongoose = require("mongoose")



module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(process.env.DB, connectionParams)
        console.log("connected to the database")
    } catch (error) {
        console.log(error)
        console.log("connection failed")
    }
}