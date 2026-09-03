import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Category } from "../types/quiz";
import { COLORS } from "../constants/colors";

interface CategorySelectorProps {
  onSelect: (category: Category) => void;
}

const categories: Category[] = [
  "Culture Générale",
  "Logique",
  "Divertissement",
];

export default function CategorySelector({
  onSelect,
}: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Éclair</Text>

      <Text style={styles.subtitle}>
        Choisis une catégorie pour commencer
      </Text>

      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.button}
            onPress={() => onSelect(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 35,
  },

  categories: {
    gap: 15,
  },

  button: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text,
  },
});