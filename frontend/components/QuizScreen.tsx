import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category, Question, QuizPhase } from "../types/quiz";
import { COLORS } from "../constants/colors";
import { Platform } from "react-native";
import axios from "axios";


async function fetchQuestionsByCategory(category: Category): Promise<Question[]> {

  const baseUrl = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/questions`;

  try {

    const response = await axios.get(apiUrl, { params: { category } });
    

    return response.data;
  } catch (error) {
    console.error(`Erreur lors de l'appel API (${apiUrl}):`, error);
    throw error;
  }
}

import CategorySelector from "../components/CategorySelector";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import AnswerFeedback from "../components/AnswerFeedback";
import ResultCard from "../components/ResultCard";

const AUTO_ADVANCE_DELAY = 1800; 

export default function QuizScreen() {

  const [phase, setPhase] = useState<QuizPhase>("category");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);



  const handleCategorySelect = useCallback(async (category: Category) => {
    setLoading(true);
    setSelectedCategory(category);
    try {
      const data = await fetchQuestionsByCategory(category);
      setQuestions(data);
      setCurrentIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setPhase("playing");
    } catch {

      console.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (selectedAnswer !== null) return; 

      const correct = answer === questions[currentIndex].correctAnswer;
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      if (correct) setScore((s) => s + 1);
    },
    [selectedAnswer, questions, currentIndex]
  );

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setPhase("result");
    } else {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  }, [currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setPhase("category");
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setSelectedCategory(null);
  }, []);

  const handleBack = useCallback(() => {
    setPhase("category");
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setSelectedCategory(null);
  }, []);




  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement des questions…</Text>
      </SafeAreaView>
    );
  }


  if (phase === "category") {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <CategorySelector onSelect={handleCategorySelect} />
        </ScrollView>
      </SafeAreaView>
    );
  }


  if (phase === "result") {
    return (
      <SafeAreaView style={styles.resultSafeArea} edges={["top"]}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <ResultCard
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      </SafeAreaView>
    );
  }


  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz Éclair ⚡</Text>
        <View style={styles.headerSpacer} />
      </View>

      {}
      <ScrollView
        style={styles.playingScroll}
        contentContainerStyle={styles.playingContent}
        showsVerticalScrollIndicator={false}
      >
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
        />

        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
        />

        {}
        {selectedAnswer !== null && isCorrect !== null && (
          <>
            <AnswerFeedback
              isCorrect={isCorrect}
              correctAnswer={currentQuestion.correctAnswer}
            />

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.9}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex + 1 >= questions.length
                  ? "Voir les résultats"
                  : "Question suivante →"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  resultSafeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.backgroundLight,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },

  
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContent: {
    flexGrow: 1,
  },

  
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  headerSpacer: {
    width: 40,
  },

  
  playingScroll: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  playingContent: {
    padding: 20,
    paddingBottom: 40,
  },

  
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 0.3,
  },
});
