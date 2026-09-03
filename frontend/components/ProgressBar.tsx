import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = current / total;
  const percentage = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Question {current} / {total}
      </Text>

      <View style={styles.barRow}>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              { width: `${percentage}%` },
            ]}
          />
        </View>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  percentage: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
    minWidth: 36,
    textAlign: "right",
  },
});