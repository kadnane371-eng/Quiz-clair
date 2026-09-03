import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  const progress = current / total;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Question {current}/{total}
      </Text>

      <View style={styles.background}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },

  background: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
});