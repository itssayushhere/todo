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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
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
    const user = await User.findById(userId).populate(
      "goals",
      "status goal"
    );
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

//@JOURNAL APi
// Add Journal Entry
router.post('/journal', authenticate, async (req, res) => {
  const userId = req.userId;
  const { date, data } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.journal.push({ date, data });
    await user.save();

    res.status(201).json({ success: true, message: 'Journal entry added', journal: user.journal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding journal entry', error });
  }
});

// Update Journal Entry
router.put('/journal/:journalId', authenticate, async (req, res) => {
  const userId = req.userId;
  const { journalId } = req.params;
  const { date, data } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const journalEntry = user.journal.id(journalId);
    if (!journalEntry) {
      return res.status(404).json({ success: false, message: 'Journal entry not found' });
    }

    if (date) journalEntry.date = date;
    if (data) journalEntry.data = data;

    await user.save();
    res.status(200).json({ success: true, message: 'Journal entry updated', journal: user.journal });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating journal entry', error });
  }
});

// Delete Journal Entry
router.delete('/journal/:journalId', authenticate, async (req, res) => {
  const userId = req.userId;
  const { journalId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const journalEntry = user.journal.id(journalId);
    if (!journalEntry) {
      return res.status(404).json({ success: false, message: 'Journal entry not found' });
    }

    // Filter out the journal entry by its ID
    user.journal = user.journal.filter(entry => entry._id.toString() !== journalId);
    
    await user.save();
    
    res.status(200).json({ success: true, message: 'Journal entry deleted', journal: user.journal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error deleting journal entry', error });
  }
});

export default router;
