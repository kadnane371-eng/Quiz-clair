import express from "express";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Quiz Éclair API fonctionne !"
  });
});

app.use("/api", questionRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});