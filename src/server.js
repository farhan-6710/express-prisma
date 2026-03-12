import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import { app } from "./app.js";

dotenv.config();
connectDB();

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  await disconnectDB();
  process.exit(0);
});
