import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["https://blog-app-frontend-delta-blush.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/user/", userRoute);
app.use("/api/blog/", blogRoute);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Conneted to db");
  } catch (err) {
    console.log("Err while connecting to db", err);
  }
};

app.listen("8080", () => {
  console.log("Listening on port 8080");
  connectDb();
});
