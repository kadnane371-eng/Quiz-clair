import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface ResultCardProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function ResultCard({
  score,
  total,
  onRestart,
}: ResultCardProps) {
  const percentage = Math.round((score / total) * 100);


  let message = "";
  let emoji = "";
  if (percentage === 100) {
    message = "Parfait !";
    emoji = "🏆";
  } else if (percentage >= 80) {
    message = "Excellent travail !";
    emoji = "⭐";
  } else if (percentage >= 60) {
    message = "Bon travail !";
    emoji = "👏";
  } else if (percentage >= 40) {
    message = "Pas mal !";
    emoji = "💪";
  } else {
    message = "Continuez à apprendre !";
    emoji = "📚";
  }

  return (
    <View style={styles.container}>
      {}
      <Text style={styles.trophyEmoji}>🏆</Text>

      {}
      <View style={styles.confettiRow}>
        <Text style={styles.confetti}>🎊</Text>
        <Text style={styles.confetti}>🎉</Text>
      </View>

      <Text style={styles.title}>Quiz terminé !</Text>
      <Text style={styles.subtitle}>Voici votre résultat</Text>

      {}
      <View style={styles.scoreCircle}>
        <View style={styles.scoreInner}>
          <Text style={styles.scoreNumber}>
            {score}
            <Text style={styles.scoreDivider}> / {total}</Text>
          </Text>
          <Text style={styles.scoreLabel}>
            {percentage >= 60 ? "Bon travail !" : "Réessayez !"}
          </Text>
        </View>
      </View>

      {}
      <View style={styles.messageCard}>
        <Text style={styles.messageEmoji}>{emoji}</Text>
        <View style={styles.messageText}>
          <Text style={styles.messageTitle}>{message}</Text>
          <Text style={styles.messageSubtitle}>Continuez comme ça !</Text>
        </View>
      </View>

      {}
      <TouchableOpacity
        style={styles.restartButton}
        onPress={onRestart}
        activeOpacity={0.9}
      >
        <Text style={styles.restartIcon}>↺</Text>
        <Text style={styles.restartText}>Recommencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  
  trophyEmoji: {
    fontSize: 70,
    marginBottom: 4,
  },

  
  confettiRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 12,
  },
  confetti: {
    fontSize: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.75)",
    marginTop: 6,
    marginBottom: 28,
  },

  
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 28,
  },
  scoreInner: {
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: 44,
    fontWeight: "900",
    color: COLORS.white,
  },
  scoreDivider: {
    fontSize: 22,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.categoryYellow,
    marginTop: 2,
  },

  
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 28,
    width: "100%",
    gap: 14,
  },
  messageEmoji: {
    fontSize: 28,
  },
  messageText: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.white,
  },
  messageSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },

  
  restartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: "100%",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  restartIcon: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: "700",
  },
  restartText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
});
