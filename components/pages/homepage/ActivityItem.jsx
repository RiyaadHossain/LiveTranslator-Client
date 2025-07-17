import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native-web";

export default function ActivityItem({item}) {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons name="language" size={16} color="#667eea" />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityPatient}>{item.patient}</Text>
        <Text style={styles.activityLanguage}>{item.language}</Text>
      </View>
      <View style={styles.activityTime}>
        <Text style={styles.activityTimeText}>{item.time}</Text>
        <Text style={styles.activityDuration}>{item.duration}</Text>
      </View>
    </View>
  );
}

const styles = {
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
  },
  activityIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#e8f2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityPatient: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  activityLanguage: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  activityTime: {
    alignItems: "flex-end",
  },
  activityTimeText: {
    fontSize: 12,
    color: "#666",
  },
  activityDuration: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
};
