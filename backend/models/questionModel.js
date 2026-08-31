import questions from "../data/questions.js";

export const getQuestionsByCategory = (category) => {
  return questions.filter(
    (question) => question.category === category
  );
};