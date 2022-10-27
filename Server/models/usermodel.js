const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const { valid } = require('joi')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPass: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: false
    },
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id},process.env.JWTPRIVATEKEY,{expiresIn: "60s"})
    return token
}

const userModel = mongoose.model("user",userSchema)

const validate  = (data) => {
    const schema = Joi.object({
        userName:Joi.string().required().label("Name"),
        userEmail:Joi.string().email().required().label("Email"),
        userPass:passwordComplexity().required().label("Password"),
        userRole:Joi.string().required().label("Role")

    })

    return schema.validate(data)
}

module.exports = {userModel,validate}