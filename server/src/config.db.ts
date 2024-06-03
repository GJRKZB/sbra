import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("New mongodb connection established");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
