import React from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, Text, View } from "react-native-web";

export default function FilterButtonUI({
  sessions,
  setSelectedFilter,
  selectedFilter,
}) {
  const FilterButton = ({ title, value, count }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === value && styles.activeFilterButton,
      ]}
      onPress={() => setSelectedFilter(value)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === value && styles.activeFilterButtonText,
        ]}
      >
        {title}
      </Text>
      {count > 0 && (
        <View style={styles.filterBadge}>
          <Text style={styles.filterBadgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.filtersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filtersRow}>
          <FilterButton title="All" value="all" count={sessions.length} />
          <FilterButton
            title="Today"
            value="today"
            count={
              sessions.filter(
                (s) => s.date === new Date().toISOString().split("T")[0]
              ).length
            }
          />
          <FilterButton
            title="Emergency"
            value="emergency"
            count={sessions.filter((s) => s.sessionType === "emergency").length}
          />
          <FilterButton
            title="Completed"
            value="completed"
            count={sessions.filter((s) => s.status === "completed").length}
          />
          <FilterButton
            title="High Accuracy"
            value="high-accuracy"
            count={sessions.filter((s) => s.translationAccuracy >= 95).length}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  filtersContainer: {
    marginBottom: 20,
  },
  filtersRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  activeFilterButton: {
    backgroundColor: "#fff",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  activeFilterButtonText: {
    color: "#667eea",
  },
  filterBadge: {
    backgroundColor: "#feca57",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  filterBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
};
