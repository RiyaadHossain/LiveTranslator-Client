import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ThreeBarLoader from "../../components/ui/ThreeBarLoader";
import { formatTime } from "../../utils/format";
import { USER_ROLES } from "../../enums/user";
import BackButton from "../../components/ui/BackButton";

const TranslationScreen = ({ navigation }) => {
  const [isListening, setIsListening] = useState("");
  const [isTranslating, setIsTranslating] = useState("");
  const [currentSpeaker, setCurrentSpeaker] = useState(null); // 'doctor' or 'patient'
  const [sessionDuration, setSessionDuration] = useState(0);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Timer for session duration
  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const startTranslation = (speaker) => {
    if (isListening === speaker) {
      setIsListening("");
      setIsTranslating(speaker);
      setCurrentSpeaker(null);

      // Simulate translation process
      setTimeout(() => {
        const mockTranslation = {
          id: Date.now(),
          speaker,
          originalText:
            speaker === "doctor"
              ? "How are you feeling today?"
              : "I have a headache",
          translatedText:
            speaker === "doctor"
              ? "¿Cómo te sientes hoy?"
              : "Tengo dolor de cabeza",
          timestamp: new Date().toLocaleTimeString(),
          language: speaker === "doctor" ? "EN → ES" : "ES → EN",
        };

        setTranslationHistory((prev) => [mockTranslation, ...prev]);
        setIsTranslating("");
      }, 3000);

      return;
    }

    setCurrentSpeaker(speaker);
    setIsListening(speaker);

    if (!isSessionActive) {
      setIsSessionActive(true);
      setSessionDuration(0);
    }
  };

  const stopSession = () => {
    setIsSessionActive(false);
    setIsListening(false);
    setCurrentSpeaker(null);
    setSessionDuration(0);
    setTranslationHistory([]);
  };

  const clearHistory = () => {
    setTranslationHistory([]);
  };

  const TranslationButton = ({
    isDisabled = false,
    speaker,
    icon,
    title,
    subtitle,
    color,
    onPress,
  }) => (
    <TouchableOpacity
      style={[
        styles.translationButton,
        isListening && currentSpeaker === speaker && styles.activeButton,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={color}
        style={styles.buttonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.buttonContent}>
          <Ionicons name={icon} size={32} color="#fff" />
          <Text style={styles.buttonTitle}>{title}</Text>
          <Text style={styles.buttonSubtitle}>{subtitle}</Text>
          {(isListening === speaker || isTranslating === speaker) && (
            <View style={styles.listeningIndicator}>
              <Text style={styles.listeningText}>
                {isListening ? "Listening..." : "Translating..."}
              </Text>

              <ThreeBarLoader color={isListening ? "#999" : "#4169E1"} />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const TranslationItem = ({ item }) => (
    <View style={styles.translationItem}>
      <View style={styles.translationHeader}>
        <View style={styles.speakerInfo}>
          <Ionicons
            name={item.speaker === "doctor" ? "medical" : "person"}
            size={16}
            color={item.speaker === "doctor" ? "#667eea" : "#ff6b6b"}
          />
          <Text style={styles.speakerText}>
            {item.speaker === "doctor" ? "Doctor" : "Patient"}
          </Text>
          <Text style={styles.languageText}>{item.language}</Text>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.originalText}>{item.originalText}</Text>
      <View style={styles.translationDivider} />
      <Text style={styles.translatedText}>{item.translatedText}</Text>
    </View>
  );

  const isDoctorActive =
    isListening === USER_ROLES.DOCTOR || isTranslating === USER_ROLES.DOCTOR;
  const isPatientActive =
    isListening === USER_ROLES.PATIENT || isTranslating === USER_ROLES.PATIENT;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Live Translation</Text>
            <Text style={styles.headerSubtitle}>Doctor ↔ Patient</Text>
          </View>

          <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Session Info */}
        <View style={styles.sessionInfo}>
          <View style={styles.sessionCard}>
            <View style={styles.sessionItem}>
              <Ionicons name="time-outline" size={20} color="#667eea" />
              <Text style={styles.sessionLabel}>Duration</Text>
              <Text style={styles.sessionValue}>
                {formatTime(sessionDuration)}
              </Text>
            </View>
            <View style={styles.sessionDivider} />
            <View style={styles.sessionItem}>
              <Ionicons name="chatbubbles-outline" size={20} color="#667eea" />
              <Text style={styles.sessionLabel}>Translations</Text>
              <Text style={styles.sessionValue}>
                {translationHistory.length}
              </Text>
            </View>
            <View style={styles.sessionDivider} />
            <View style={styles.sessionItem}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: isSessionActive ? "#4CAF50" : "#9E9E9E" },
                ]}
              />
              <Text style={styles.sessionLabel}>Status</Text>
              <Text style={styles.sessionValue}>
                {isSessionActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
        </View>

        {/* Translation Buttons */}
        <View style={styles.buttonsContainer}>
          <TranslationButton
            isDisabled={isPatientActive || isTranslating}
            speaker={USER_ROLES.DOCTOR}
            icon="medical"
            title={USER_ROLES.DOCTOR}
            subtitle="Tap to translate to patient"
            color={["#667eea", "#764ba2"]}
            onPress={() => startTranslation(USER_ROLES.DOCTOR)}
          />

          <TranslationButton
            isDisabled={isDoctorActive || isTranslating}
            speaker={USER_ROLES.PATIENT}
            icon="person"
            title={USER_ROLES.PATIENT}
            subtitle="Tap to translate to doctor"
            color={["#ff6b6b", "#feca57"]}
            onPress={() => startTranslation(USER_ROLES.PATIENT)}
          />
        </View>

        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[styles.controlButton, styles.clearButton]}
            onPress={clearHistory}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh-outline" size={20} color="#ff6b6b" />
            <Text style={styles.controlButtonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.stopButton]}
            onPress={stopSession}
            activeOpacity={0.7}
          >
            <Ionicons name="stop-outline" size={20} color="#f44336" />
            <Text style={styles.controlButtonText}>Stop Session</Text>
          </TouchableOpacity>
        </View>

        {/* Translation History */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Translation History</Text>
          <ScrollView
            style={styles.historyScroll}
            showsVerticalScrollIndicator={false}
          >
            {translationHistory.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
                <Text style={styles.emptyStateText}>No translations yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Tap a button above to start translating
                </Text>
              </View>
            ) : (
              translationHistory.map((item) => (
                <TranslationItem key={item.id} item={item} />
              ))
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  sessionInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sessionCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  sessionItem: {
    flex: 1,
    alignItems: "center",
  },
  sessionLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  sessionValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  sessionDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e9ecef",
    marginHorizontal: 15,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  translationButton: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  activeButton: {
    shadowColor: "#667eea",
    shadowOpacity: 0.5,
  },
  buttonGradient: {
    padding: 20,
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginTop: 5,
  },
  listeningIndicator: {
    alignItems: "center",
    marginTop: 10,
  },
  listeningText: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 5,
  },
  soundWaves: {
    flexDirection: "row",
    gap: 3,
  },
  wave: {
    width: 3,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  wave1: {
    height: 8,
  },
  wave2: {
    height: 12,
  },
  wave3: {
    height: 8,
  },
  controlButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  controlButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  stopButton: {
    borderWidth: 1,
    borderColor: "#f44336",
  },
  historyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  historyScroll: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 15,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  translationItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  translationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  speakerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  speakerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  languageText: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#e9ecef",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  originalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  translationDivider: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginVertical: 10,
  },
  translatedText: {
    fontSize: 16,
    color: "#667eea",
    fontWeight: "500",
  },
});

export default TranslationScreen;
