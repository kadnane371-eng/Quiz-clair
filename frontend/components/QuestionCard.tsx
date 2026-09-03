import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Question } from "../types/quiz";
import { COLORS } from "../constants/colors";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
}

export default function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
}: QuestionCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {question.question}
      </Text>

      <View style={styles.options}>
        {question.options.map((option) => {
          const selected = selectedAnswer === option;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                selected && styles.selectedOption,
              ]}
              onPress={() => onAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.selectedText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },

  question: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 30,
    marginBottom: 25,
  },

  options: {
    gap: 12,
  },

  option: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 14,
    padding: 16,
  },

  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  optionText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },

  selectedText: {
    color: COLORS.white,
  },
});