const router = require("express").Router()
const {userModel,validate} = require('../models/usermodel') 
const bcrypt = require("bcrypt")


router.post("/",async(req,res)=>{
    //console.log(req.body);
     try {
        const {error} = validate(req.body)
        if (error){
            return res.status(400).send({message: error.details[0].message})
        }
        const checkUser = await userModel.findOne({userEmail: req.body.userEmail})
        if (checkUser){
            return res.status(409).send({message: "User with given email already exist"})
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT)) 
        const hashPassword = await bcrypt.hash(req.body.userPass,salt)

        await new userModel({...req.body,userPass:hashPassword}).save()
        res.status(201).send({message:"User created Successfully"})
     } catch (error) {
            res.status(500).send({message: "Internal Server Error"})        
     }
})

module.exports = router