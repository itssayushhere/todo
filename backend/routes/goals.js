import express from 'express'
import Goals from '../schema/goalsSchema.js'
import User from '../schema/userSchema.js'
import { authenticate } from '../verifyauth.js'

const router = express.Router()
router.post('/create',authenticate,async(req,res)=>{
    const userId = req.userId
    const {goal,till} = req.body
    try {
        const user = await User.findById(userId)
        if(!user){
        return res.status(404).json({success:true,message:"User not found"})
        }
        const life = new Goals({
            user:user._id,
            goal:goal,
            deadline:till
        })
        user.goals.push(life._id)
        await life.save()
        await user.save()
        res.status(200).json({success:true,message:"Goals Uploaded",life})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Network error",error})
    }
})

export default router