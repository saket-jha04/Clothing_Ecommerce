import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET) 
}


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user) return res.status(400).json({sucess: "false", message: "User does not exist"})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.status(200).json({sucess: "true", token})
        }
        else {
            res.status(400).json({sucess: "false", message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({sucess: "false", message: error.message})
    }

}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        const exists = await userModel.findOne({email})
        if(exists) return res.status(400).json({sucess: "false", message: "User already exists"})
        
        if(!validator.isEmail(email)) return res.status(400).json({sucess: "false", message: "Invalid email"})
        
        if(password.length < 6) return res.status(400).json({sucess: "false", message: "Please enter strong password"})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.status(200).json({sucess: "true", token})
        
    } catch (error) {
        console.log(error)
        res.json({sucess: "false", message: error.message})
    }
}

const adminLogin = async (req, res) => {
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        
    }
}

export { loginUser, registerUser, adminLogin }