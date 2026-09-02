import sequelize from "../config/database.js";
import Question from "../models/Question.js";
import questions from "../data/questions.js";

const seedQuestions = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected");

    await sequelize.sync();

    const count = await Question.count();

    if (count > 0) {
      console.log("Questions already exist");
      process.exit();
    }

    const allQuestions = Object.entries(questions).flatMap(
      ([category, questionList]) =>
        questionList.map((q) => ({
          category,
          question: q.question,
          options: q.options,
          answer: q.answer,
        }))
    );

    await Question.bulkCreate(allQuestions);

    console.log(`${allQuestions.length} questions inserted successfully`);

    process.exit();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedQuestions();