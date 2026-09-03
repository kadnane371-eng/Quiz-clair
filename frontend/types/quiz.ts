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

export type QuizPhase = "category" | "playing" | "result";

export interface CategoryInfo {
  name: Category;
  icon: string;
  questionCount: number;
  color: string;
}