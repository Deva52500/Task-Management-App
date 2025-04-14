import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email})
        if (user){
            return res.status(401)
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const newUser = new User({
            name, email, password:hashPassword
        })

        await newUser.save()
        return res.status(201).json({success: true, message: 'Successfully created a new user' })
    }catch(error){
        return res.status(500).json({success: false, message: 'Failed' })
    }
})

router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if (!user){
            return res.status(401).json({success: false, message: 'User doesnot exist'})
        }

        const confirmPassword = await bcrypt.compare(password, user.password)

        if (!confirmPassword){
            return res.status(401).json({success: false, message: 'Incorrect Password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:"1h"})
        return res.status(201).json({success: true, token, user: {name:user.name}, message: 'Successfully Logged In' })
    }catch(error){
        return res.status(500).json({success: false, message: 'Failed to login' })
    }
})


export default router