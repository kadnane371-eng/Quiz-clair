import { getQuestionsByCategory } from "../models/questionModel.js";

export const getQuestions = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "La catégorie est obligatoire" });
    }


    let dbCategory = "culture";
    if (category === "Logique") dbCategory = "logique";
    if (category === "Divertissement") dbCategory = "divertissement";

    const questions = await getQuestionsByCategory(dbCategory);

    if (questions.length === 0) {
      return res.status(404).json({ message: "Aucune question trouvée pour cette catégorie" });
    }


    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.answer, 
      category: category       
    }));

    res.json(formattedQuestions);
  } catch (error) {
    console.error("Error getting questions:", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};