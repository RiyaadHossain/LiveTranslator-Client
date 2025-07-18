import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native-web";
import {
  getEmergencyColor,
  getSessionTypeIcon,
  getStatusColor,
} from "../../../utils/icon-color";

export default function SessionCard({
  session,
  setSelectedSession,
  setModalVisible,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => {
        setSelectedSession(session);
        setModalVisible(true);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.sessionHeader}>
        <View style={styles.sessionInfo}>
          <View style={styles.sessionTypeContainer}>
            <Ionicons
              name={getSessionTypeIcon(session.sessionType)}
              size={16}
              color={getEmergencyColor(session.emergencyLevel)}
            />
            <Text
              style={[
                styles.sessionType,
                { color: getEmergencyColor(session.emergencyLevel) },
              ]}
            >
              {session.sessionType.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.patientName}>{session.patient.firstName}</Text>
          <Text style={styles.patientDetails}>
            {session.patient.age} years • {session.patient.language}
          </Text>
        </View>
        <View style={styles.sessionMeta}>
          <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
          <Text style={styles.sessionTime}>{session.time}</Text>
        </View>
      </View>

      <View style={styles.sessionMiddle}>
        <Text style={styles.sessionCondition}>{session.patient.medicalCondition}</Text>
        <View style={styles.sessionStats}>
          <View style={styles.statItem}>
            <Ionicons name="time" size={12} color="#666" />
            <Text style={styles.statText}>{session.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="chatbubbles" size={12} color="#666" />
            <Text style={styles.statText}>{session.messageCount}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={12} color="#666" />
            <Text style={styles.statText}>{session.translationAccuracy}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.sessionFooter}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(session.status) },
          ]}
        />
        <Text style={styles.statusText}>{session.status}</Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            setSelectedSession(session);
            setModalVisible(true);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={14} color="#667eea" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  sessionCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  sessionType: {
    fontSize: 12,
    fontWeight: "bold",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  patientDetails: {
    fontSize: 14,
    color: "#666",
  },
  sessionMeta: {
    alignItems: "flex-end",
  },
  sessionDate: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  sessionTime: {
    fontSize: 12,
    color: "#999",
  },
  sessionMiddle: {
    marginBottom: 12,
  },
  sessionCondition: {
    fontSize: 12,
    color: "#ff6b6b",
    backgroundColor: "#ffe6e6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  sessionStats: {
    flexDirection: "row",
    gap: 15,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  statText: {
    fontSize: 12,
    color: "#666",
  },
  sessionFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  viewButtonText: {
    fontSize: 12,
    color: "#667eea",
    fontWeight: "600",
  },
};
