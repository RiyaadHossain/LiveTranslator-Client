import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {TouchableOpacity, Text, View } from "react-native";

export default function PatientCard({ patient, setPatients }) {
  const toggleFavorite = (patientId) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient._id === patientId
          ? { ...patient, isFavorite: !patient.isFavorite }
          : patient
      )
    );
  };

  const viewPatientDetails = (patient) => {};

  return (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => viewPatientDetails(patient)}
      activeOpacity={0.7}
    >
      <View style={styles.patientCardHeader}>
        <View style={styles.patientInfo}>
          <View style={styles.patientAvatar}>
            <Text style={styles.patientInitials}>
              {patient.firstName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>
          <View style={styles.patientDetails}>
            <Text
              style={styles.patientName}
            >{`${patient.firstName} ${patient.lastName}`}</Text>
            <Text style={styles.patientMeta}>
              {patient.age} years • {patient.language}
            </Text>
            <Text style={styles.patientCondition}>
              {patient.medicalCondition}
            </Text>
          </View>
        </View>
        <View style={styles.patientActions}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(patient._id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={patient.isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={patient.isFavorite ? "#ff6b6b" : "#ccc"}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  patient.status === "Active" ? "#4CAF50" : "#9E9E9E",
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.patientCardFooter}>
        <View style={styles.lastVisitInfo}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text style={styles.lastVisitText}>
            Last visit: {new Date(patient.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.translateButton}
          onPress={() =>
            router.push({
              pathname: "translation/live",
              params: { patientId: patient._id },
            })
          }
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.translateButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="language" size={16} color="#fff" />
            <Text style={styles.translateButtonText}>Translate</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  patientCard: {
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
  patientCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  patientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#667eea",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  patientInitials: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  patientMeta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  patientCondition: {
    fontSize: 12,
    color: "#ff6b6b",
    backgroundColor: "#ffe6e6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  patientActions: {
    alignItems: "center",
    gap: 10,
  },

  lastVisitInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  lastVisitText: {
    fontSize: 12,
    color: "#666",
  },

  patientCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  translateButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  translateButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  translateButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
};
