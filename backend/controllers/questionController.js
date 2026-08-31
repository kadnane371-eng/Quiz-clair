import { getQuestionsByCategory } from "../models/questionModel.js";

export const getQuestions = (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({
      message: "La catégorie est obligatoire"
    });
  }

  const questions = getQuestionsByCategory(category);

  if (questions.length === 0) {
    return res.status(404).json({
      message: "Aucune question trouvée pour cette catégorie"
    });
  }

  res.json(questions);
};