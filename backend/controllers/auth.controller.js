import { User } from "../models/user.model"
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { email, password, name } = req.body

    try {
        if (!email || !password || !name)
            throw new Error("All fields are required")

        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({success: false, message: "User already exists"})
        }

        const hashedMessage = await bcrypt.hash(password, 10)
        const user = new User({
            email, 
            password: hashedMessage,
            name
        })


        res.send("Signup Route")
    }catch(error){
        return res.status(400).json({success: false, message: error.message})

    }
}

export const login = async (req, res) => {
    res.send("login Route")
}

export const logout = async (req, res) => {
    res.send("logout Route")
}