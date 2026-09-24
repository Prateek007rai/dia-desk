import dotenv from "dotenv";
import path from "path";

// Load .env file from apps/api root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  NODE_ENV: process.env.NODE_ENV || "development",
};

// Validate required env vars
const requiredEnvs = ["MONGODB_URI", "JWT_SECRET", "JWT_REFRESH_SECRET"];

for (const key of requiredEnvs) {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
}
