import mongoose, { model, Schema } from "mongoose";

const JournalSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  data: { type: String, required: true }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  goals: [{ type: mongoose.Types.ObjectId, ref: "Goals" }],
  about: { type: String },
  journal: [JournalSchema]  // Subdocument schema with timestamps
});

export default mongoose.model("User", UserSchema);
