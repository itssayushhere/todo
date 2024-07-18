import express, { json, Router } from "express";
import bcrypt from "bcryptjs";
import User from "../schema/userSchema.js";
import jwt from 'jsonwebtoken'
import { authenticate } from "../verifyauth.js";
const router = express.Router()
//{---------------------user manupliation----------------}
//user register
router.post('/register',async (req, res) => {
  const { email, password,age,name} = req.body;
  try {
    // Check if user with the email already exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ success: false, message: "Email already exists. Please use a different email." });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    // Create a new user
    await User.create({
        email,
        password:hashpassword,
        age,
        name
    })
    res.status(200).json({ success: true, message: "Registration successful" });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering: " + error.message,
    });
  }   
})
//user login
router.post("/login",async(req,res)=>{
  const {email,password}= req.body
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({success:false,message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({success:false,message:"Invalid Password"})
    }
    const token = jwt.sign(
      { id: user._id, email: user.email , name:user.name} ,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const userdata = {
      id:user._id,
      name:user.name,
      age:user.age,
    }
    res.status(200).json({userdata,token})
  } catch (error) {
   res.status(400).json({success:true,message:"Error login",error}) 
  }
})

router.get('/goals',authenticate,async(req,res)=>{
  const userId = req.userId
  try {
    const user = await User.findById(userId).populate('goals','goal deadline status')
    if(!user){ return res.status(404).json({success:false,message:"User Not found"})}
    const data = user.goals
    res.status(200).json({data})
  } catch (error) {
    res.status(400).json({success:false,message:"Server Error"})
  }
})
export default router