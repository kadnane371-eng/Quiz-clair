import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Question } from "../types/quiz";
import { COLORS } from "../constants/colors";

const OPTION_LETTERS = ["A", "B", "C", "D"];

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

export default function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
  isCorrect,
}: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.question}</Text>

      <View style={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = option === question.correctAnswer;
          const hasAnswered = selectedAnswer !== null;


          let optionStyle: any[] = [styles.option];
          let textStyle: any[] = [styles.optionText];
          let letterStyle: any[] = [styles.optionLetter];
          let letterContainerStyle: any[] = [styles.letterContainer];

          if (hasAnswered) {
            if (isSelected && isCorrect) {

              optionStyle.push(styles.optionCorrect);
              textStyle.push(styles.optionTextCorrect);
              letterContainerStyle.push(styles.letterContainerCorrect);
              letterStyle.push(styles.letterCorrect);
            } else if (isSelected && !isCorrect) {

              optionStyle.push(styles.optionWrong);
              textStyle.push(styles.optionTextWrong);
              letterContainerStyle.push(styles.letterContainerWrong);
              letterStyle.push(styles.letterWrong);
            } else if (isAnswer) {

              optionStyle.push(styles.optionCorrect);
              textStyle.push(styles.optionTextCorrect);
              letterContainerStyle.push(styles.letterContainerCorrect);
              letterStyle.push(styles.letterCorrect);
            }
          }

          return (
            <TouchableOpacity
              key={option}
              style={optionStyle}
              onPress={() => onAnswer(option)}
              disabled={hasAnswered}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                <View style={letterContainerStyle}>
                  <Text style={letterStyle}>
                    {OPTION_LETTERS[index]}
                  </Text>
                </View>
                <Text style={textStyle}>{option}</Text>
              </View>

              {}
              {hasAnswered && isSelected && (
                <View
                  style={[
                    styles.feedbackIcon,
                    isCorrect
                      ? styles.feedbackCorrect
                      : styles.feedbackWrong,
                  ]}
                >
                  <Text style={styles.feedbackEmoji}>
                    {isCorrect ? "✓" : "✗"}
                  </Text>
                </View>
              )}

              {}
              {hasAnswered && !isCorrect && isAnswer && !isSelected && (
                <View style={[styles.feedbackIcon, styles.feedbackCorrect]}>
                  <Text style={styles.feedbackEmoji}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 28,
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },

  
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  letterContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  optionLetter: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    flex: 1,
  },

  
  optionCorrect: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  optionTextCorrect: {
    color: COLORS.success,
    fontWeight: "600",
  },
  letterContainerCorrect: {
    backgroundColor: COLORS.success,
  },
  letterCorrect: {
    color: COLORS.white,
  },

  
  optionWrong: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorLight,
  },
  optionTextWrong: {
    color: COLORS.error,
    fontWeight: "600",
  },
  letterContainerWrong: {
    backgroundColor: COLORS.error,
  },
  letterWrong: {
    color: COLORS.white,
  },

  
  feedbackIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackCorrect: {
    backgroundColor: COLORS.success,
  },
  feedbackWrong: {
    backgroundColor: COLORS.error,
  },
  feedbackEmoji: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
});