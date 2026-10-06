import mongoose from "mongoose";
import { env } from "./env";

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Exits the process if the connection fails to prevent the app from running without a DB.
 * 
 * @returns {Promise<void>} Resolves when the connection is successful.
 */
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
