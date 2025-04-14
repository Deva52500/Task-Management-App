import express from 'express'
import Task from '../models/Task.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',authMiddleware, async(req, res)=>{
    try{
        const {title, description, completed} = req.body;
        const isCompleted = completed === 'yes';

        const newTask = new Task({
            title, description, completed: isCompleted, userId: req.user.id 
        })

        await newTask.save()
        return res.status(201).json({success: true, message: 'Successfully created a new task' })
    }catch(error){
        return res.status(500).json({success: false, message: 'Failed to create a new task'  })
    } 
})

router.get('/', async(req, res)=>{
    try{
        const tasks= await Task.find()
        return res.status(200).json({success: true, tasks})
    }catch(error){
        return res.status(500).json({success: false})
    }
})

router.put('/:id', async(req, res)=>{
    try{
        const {id}= req.params 
        const updateTask = await Task.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success: true, updateTask})
    }catch(error){
        return res.status(500).json({success: false})
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const {id}= req.params 
        const deleteTask = await Task.findByIdAndDelete(id)
        return res.status(200).json({success: true, deleteTask})
    }catch(error){
        return res.status(500).json({success: false})
    }

})

export default router