import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Quiz Éclair API fonctionne !",
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

startServer();