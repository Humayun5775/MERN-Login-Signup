const { userModel } = require("../models/usermodel")
const router = require ("express").Router()
const joi = require("joi")
const bcrypt = require("bcrypt")


router.post("/", async (req,res)=>{
    try {
        const {error} = validate(req.body)
        if (error){
            return res.status(400).send({message: error.details[0].message})
        }
        const checkUser = await userModel.findOne({userEmail: req.body.userEmail})
        if (!checkUser){
            return res.status(401).send({message:"Invalid Email or Password"})
        }
        const validPassword = await bcrypt.compare(
            req.body.userPass,checkUser.userPass
        )
        if (!validPassword){
            return res.status(401).send({message:"Invalid Email or Password"})
        }
        const token = checkUser.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
})

const validate = (data) => {
    const Schema = joi.object({
        userEmail:joi.string().email().required().label("Email"),
        userPass:joi.string().required().label("Password")  
    })
    return Schema.validate(data)
}

module.exports = router