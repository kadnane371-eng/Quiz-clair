import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Category, CategoryInfo } from "../types/quiz";
import { COLORS } from "../constants/colors";

const { width } = Dimensions.get("window");

interface CategorySelectorProps {
  onSelect: (category: Category) => void;
}

const categories: CategoryInfo[] = [
  {
    name: "Culture Générale",
    icon: "🧠",
    questionCount: 5,
    color: COLORS.categoryPink,
  },
  {
    name: "Logique",
    icon: "💡",
    questionCount: 5,
    color: COLORS.categoryYellow,
  },
  {
    name: "Divertissement",
    icon: "🍿",
    questionCount: 5,
    color: COLORS.categoryRed,
  },
];

export default function CategorySelector({
  onSelect,
}: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconEmoji}>⚡</Text>
        </View>

        <Text style={styles.title}>Quiz Éclair</Text>
        <Text style={styles.subtitle}>
          Testez vos connaissances{"\n"}en quelques minutes !
        </Text>
      </View>

      {}
      <Text style={styles.sectionLabel}>
        ✨ Choisissez une catégorie ✨
      </Text>

      {}
      <View style={styles.cards}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.name}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => onSelect(cat.name)}
          >
            <View style={styles.cardLeft}>
              <View
                style={[
                  styles.cardIconCircle,
                  { backgroundColor: cat.color + "20" },
                ]}
              >
                <Text style={styles.cardIcon}>{cat.icon}</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>{cat.name}</Text>
                <Text style={styles.cardSub}>
                  {cat.questionCount} questions
                </Text>
              </View>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.25)",
  },
  iconEmoji: {
    fontSize: 42,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 22,
  },

  
  sectionLabel: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
    marginTop: 28,
    marginBottom: 18,
    letterSpacing: 0.3,
  },

  
  cards: {
    paddingHorizontal: 20,
    gap: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cardIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardIcon: {
    fontSize: 26,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  cardSub: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2,
  },
  arrow: {
    fontSize: 28,
    color: COLORS.gray,
    fontWeight: "300",
  },
});