import Question from "./Question.js";

export const getQuestionsByCategory = async (category) => {
  return await Question.findAll({
    where: {
      category: category,
    },
  });
};