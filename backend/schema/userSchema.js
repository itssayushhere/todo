import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name:{type:String,required:true},
  age:{type:Number,required:true},
  goals: [{ type: mongoose.Types.ObjectId , ref:"Goals"}],
});
export default mongoose.model("User", UserSchema);