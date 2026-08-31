import express from "express";
import { getQuestions } from "../controllers/questionController.js";

const router = express.Router();

router.get("/questions", getQuestions);

export default router;