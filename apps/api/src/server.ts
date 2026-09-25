import app from "./app";
import { env, connectDB } from "./config";

const startServer = async () => {
  // Connect to the database first
  await connectDB();

  // Start the express server
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Dia Desk API running on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`);
  });

  // Handle unhandled promise rejections gracefully
  process.on("unhandledRejection", (err: Error) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

startServer();
