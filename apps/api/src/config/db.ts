import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error("❌ Unknown error connecting to MongoDB");
    }
    process.exit(1);
  }
};
