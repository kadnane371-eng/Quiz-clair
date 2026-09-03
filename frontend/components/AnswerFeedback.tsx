import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
}

export default function AnswerFeedback({
  isCorrect,
  correctAnswer,
}: AnswerFeedbackProps) {
  return (
    <View
      style={[
        styles.container,
        isCorrect ? styles.correctBg : styles.wrongBg,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{isCorrect ? "✅" : "❌"}</Text>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              isCorrect ? styles.correctText : styles.wrongText,
            ]}
          >
            {isCorrect ? "Bonne réponse ! 🎉" : "Mauvaise réponse"}
          </Text>
          <Text style={styles.detail}>
            {isCorrect
              ? `${correctAnswer} est la bonne réponse.`
              : `La bonne réponse était : ${correctAnswer}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 16,
  },
  correctBg: {
    backgroundColor: COLORS.success,
  },
  wrongBg: {
    backgroundColor: COLORS.error,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  correctText: {
    color: COLORS.white,
  },
  wrongText: {
    color: COLORS.white,
  },
  detail: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
  },
});
