import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    options: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "questions",
    timestamps: false,
  }
);

export default Question;