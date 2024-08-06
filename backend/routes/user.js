import express, { json, Router } from "express";
import bcrypt from "bcryptjs";
import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import { authenticate } from "../verifyauth.js";
const router = express.Router();
//*{------------------------user-manupliation----------------}
//@ User Register
router.post("/register", async (req, res) => {
  const { email, password, age, name } = req.body;
  try {
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashpassword,
      age,
      name,
    });
    res.status(200).json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering: " + error.message,
    });
  }
});

//@User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // true in production, false in development
      sameSite: isProduction ? "None" : "Lax", // Use None for cross-site cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error logging in", error });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(404).json({ error });
  }
});
//@Get UserData
router.get("/data", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not exists" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});
//@update data
router.put("/update", authenticate, async (req, res) => {
  const userId = req.userId;
  const updateData = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const { password, ...rest } = user._doc;
    res
      .status(200)
      .json({
        success: true,
        message: "user updated successfully",
        data: { ...rest },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
//@goals
router.get("/goals", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate(
      "goals",
      "goal deadline status createdAt updatedAt"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not found" });
    }
    const data = user.goals;
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Server Error" });
  }
});
export default router;
