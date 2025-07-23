import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {TouchableOpacity, Modal, ScrollView, Text, View } from "react-native";
import { getEmergencyColor, getStatusColor } from "../../../utils/icon-color";

export default function SessionDetailModal({
  modalVisible,
  setModalVisible,
  selectedSession,
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
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Session Details</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {selectedSession && (
          <ScrollView style={styles.modalContent}>
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Patient Information</Text>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Name:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.patient.firstName}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Age:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.patient.age} years
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Language:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.patient.language}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Condition:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.patient.condition}
                </Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Session Details</Text>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Date & Time:</Text>
                <Text style={styles.modalValue}>
                  {formatDate(selectedSession.date)} at {selectedSession.time}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Duration:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.duration}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Session Type:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.sessionType}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Status:</Text>
                <Text
                  style={[
                    styles.modalValue,
                    { color: getStatusColor(selectedSession.status) },
                  ]}
                >
                  {selectedSession.status}
                </Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Translation Metrics</Text>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Accuracy:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.translationAccuracy}%
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Messages:</Text>
                <Text style={styles.modalValue}>
                  {selectedSession.messageCount}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>Emergency Level:</Text>
                <Text
                  style={[
                    styles.modalValue,
                    {
                      color: getEmergencyColor(selectedSession.emergencyLevel),
                    },
                  ]}
                >
                  {selectedSession.emergencyLevel}
                </Text>
              </View>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Session Summary</Text>
              <Text style={styles.modalSummary}>{selectedSession.summary}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Key Topics</Text>
              <View style={styles.topicsContainer}>
                {selectedSession.keyTopics.map((topic, index) => (
                  <View key={index} style={styles.topicTag}>
                    <Text style={styles.topicText}>{topic}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalSection: {
    marginTop: 20,
    marginBottom: 15,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  modalLabel: {
    fontSize: 14,
    color: "#666",
    width: 100,
    fontWeight: "600",
  },
  modalValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  modalSummary: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicTag: {
    backgroundColor: "#e8f2ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  topicText: {
    fontSize: 12,
    color: "#667eea",
    fontWeight: "600",
  },
};
