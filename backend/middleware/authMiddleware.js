import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authMiddleware = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]

        const decode= jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById({_id: decode.id})

        const userName = {name: user.name, id: user._id}
        req.user= userName
        next()
    }catch(error){
        res.status(401)
        throw new Error('User Not Authorized')
    }
}

export default authMiddleware