import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native-web";

export default function EmptyState({searchQuery, text, subtext1, subtext2, iconName}) {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={iconName} size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>{text}</Text>
      <Text style={styles.emptyStateSubtext}>
        {searchQuery
          ? subtext1
          : subtext2}
      </Text>
    </View>
  );
}

const styles = {
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    fontWeight: "600",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
};
