import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import GradientBackground from "../../components/ui/GradientBackground";
import { fetchPatients } from "../../utils/api";
import { Ionicons } from "@expo/vector-icons";
import globalStyles from "../../styles/global";
import { router } from "expo-router";
// import { mockPatients } from "../../constants/dummy";
import BackButton from "../../components/ui/BackButton";
import PatientCard from "../../components/pages/patientList/PatientCard";
import EmptyState from "../../components/pages/patientList/EmptyState";

const PatientListScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all"); // all, recent, favorites

  useEffect(() => {
    const getPatients = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPatients();
        setPatients(data);
        setFilteredPatients(data);
      } catch (_error) {
        setPatients([]);
        setFilteredPatients([]);
      } finally {
        setIsLoading(false);
      }
    };
    getPatients();
  }, []);

  useEffect(() => {
    filterPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedFilter, patients]);

  const filterPatients = () => {
    let filtered = patients;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected filter
    switch (selectedFilter) {
      case "recent":
        filtered = filtered.filter(
          (patient) =>
            new Date(patient.lastVisit) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        break;
      case "favorites":
        filtered = filtered.filter((patient) => patient.isFavorite);
        break;
      default:
        break;
    }

    setFilteredPatients(filtered);
  };

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
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <GradientBackground>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Patient List</Text>
            <Text style={styles.headerSubtitle}>
              {filteredPatients.length} patient
              {filteredPatients.length !== 1 ? "s" : ""}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/patients/add-patient")}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search patients..."
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
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersRow}>
              <FilterButton title="All" value="all" count={patients.length} />
              <FilterButton
                title="Recent"
                value="recent"
                count={
                  patients.filter(
                    (p) =>
                      new Date(p.lastVisit) >=
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length
                }
              />
              <FilterButton
                title="Favorites"
                value="favorites"
                count={patients.filter((p) => p.isFavorite).length}
              />
            </View>
          </ScrollView>
        </View>

        {/* Patient List */}
        <View style={styles.listContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading patients...</Text>
            </View>
          ) : filteredPatients.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              text="No patients found"
              subtext1="Try adjusting your search criteria"
              subtext2="Patients will appear here when added"
              iconName="people-outline"
            />
          ) : (
            <FlatList
              data={filteredPatients}
              renderItem={({ item }) => (
                <PatientCard patient={item} setPatients={setPatients} />
              )}
              keyExtractor={(item) => item._id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </GradientBackground>
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
  addButton: {
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

  favoriteButton: {
    padding: 5,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
});

export default PatientListScreen;
