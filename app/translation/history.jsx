import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../../styles/global";
import BackButton from "../../components/ui/BackButton";
import { getSessions } from "../../utils/api";
import SessionCard from "../../components/pages/history/SessionCard";
import SessionDetailModal from "../../components/pages/history/SessionDetailModal";
import FilterButtonUI from "../../components/pages/history/FilterButtonUI";

const TranslationHistoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSession, setSelectedSession] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchSessionList = async () => {
      setIsLoading(true);
      try {
        const sessionList = await getSessions();
        setSessions(sessionList);
        setFilteredSessions(sessionList);
      } catch (err) {
        console.log("Error fetching sessions:", err);
        setSessions([]);
        setFilteredSessions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSessionList();
  }, []);

  useEffect(() => {
    filterSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedFilter, sessions]);

  const filterSessions = () => {
    let filtered = sessions;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (session) =>
          session.patient.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          session.patient.language
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          session.patient.condition
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          session.sessionType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected filter
    switch (selectedFilter) {
      case "today":
        const today = new Date().toISOString().split("T")[0];
        filtered = filtered.filter((session) => session.date === today);
        break;
      case "emergency":
        filtered = filtered.filter(
          (session) => session.sessionType === "emergency"
        );
        break;
      case "completed":
        filtered = filtered.filter((session) => session.status === "completed");
        break;
      case "high-accuracy":
        filtered = filtered.filter(
          (session) => session.translationAccuracy >= 95
        );
        break;
      default:
        break;
    }

    setFilteredSessions(filtered);
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="document-text-outline" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>No translation sessions found</Text>
      <Text style={styles.emptyStateSubtext}>
        {searchQuery
          ? "Try adjusting your search criteria"
          : "Translation sessions will appear here"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={globalStyles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <BackButton />

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Translation History</Text>
            <Text style={styles.headerSubtitle}>
              {filteredSessions.length} session
              {filteredSessions.length !== 1 ? "s" : ""}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => Alert.alert("Export", "Export feature coming soon")}
            activeOpacity={0.7}
          >
            <Ionicons name="download" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search sessions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery ? (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                activeOpacity={0.7}
              >
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Filter Buttons */}
        <FilterButtonUI
          selectedFilter={selectedFilter}
          sessions={sessions}
          setSelectedFilter={setSelectedFilter}
        />

        {/* Sessions List */}
        <View style={styles.listContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading sessions...</Text>
            </View>
          ) : filteredSessions.length === 0 ? (
            <EmptyState />
          ) : (
            <FlatList
              data={filteredSessions}
              renderItem={({ item }) => (
                <SessionCard
                  setModalVisible={setModalVisible}
                  setSelectedSession={setSelectedSession}
                  session={item}
                />
              )}
              keyExtractor={(item) => item._id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>

        {/* Session Detail Modal */}
        <SessionDetailModal
          modalVisible={modalVisible}
          selectedSession={selectedSession}
          setModalVisible={setModalVisible}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
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
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    outlineStyle: "none",
  },

  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
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
});

export default TranslationHistoryScreen;
