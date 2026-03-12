import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = 5001;

// body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

app.listen(PORT, () => {
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
