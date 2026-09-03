export type Category =
  | "Culture Générale"
  | "Logique"
  | "Divertissement";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: Category;
}