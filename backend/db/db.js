import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection Successful")
    }catch (error){
        console. log("Connection Failed")
    }
}
export default connectDB