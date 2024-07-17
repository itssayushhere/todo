import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("Api is working");
});
mongoose.set("strictQuery", false);
const connectdb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("Falure to connect the database" + error);
  }
};
const corsOption = {
    origin: true,
};
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());

app.listen(port, () => {
  connectdb();
  console.log("Server runing on the " + port);
});