import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/", (req, res) => {});

export default router;
