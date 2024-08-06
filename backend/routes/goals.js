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
router.put('/edit/:id', authenticate, async (req, res) => {
    const goalId = req.params.id;
    const updateData = req.body;

    try {
        const goal = await Goals.findByIdAndUpdate(goalId, updateData, { new: true });
        
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json({ message: 'Goal updated successfully', goal });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
router.delete('/delete/:id', authenticate, async (req, res) => {
    const userId = req.userId;
    const  goalId  = req.params.id; // Extract goalId from URL parameters
  
    try {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Find the goal
      const goal = await Goals.findById(goalId);
      if (!goal) {
        return res.status(404).json({ success: false, message: 'Goal not found' });
      }
  
      // Check if the goal belongs to the user
      if (!user.goals.includes(goalId)) {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this goal' });
      }
  
      // Remove the goal from the user's goals array
      user.goals = user.goals.filter(id => id.toString() !== goalId);
      await user.save();
  
      // Delete the goal from the database
      await Goals.findByIdAndDelete(goalId);
  
      res.status(200).json({ success: true, message: 'Goal deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: 'Network error', error });
    }
  });
  

export default router