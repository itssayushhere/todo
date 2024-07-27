import mongoose, { Schema } from "mongoose";
const GoalSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    goal: { type: String, required: true },
    deadline:{type:Date,required:true},
    status: {
      type: String,
      enum: ["completed", "working","failed","halfway"],
      default: "working"
    },
  },
  { timestamps: true }
);
export default mongoose.model("Goals",GoalSchema)