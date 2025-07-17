import GradientBackground from "@/components/ui/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActivityItem from "../components/pages/homepage/ActivityItem";
import QuickActionCard from "../components/pages/homepage/QuickActionCard";
import StatCard from "../components/pages/homepage/StatCard";
import { quickActions, recentActivity, statInfo } from "../constants/dummy";
import globalStyles from "../styles/global";
import { formatDateToTime, getGreeting } from "../utils/format";
import { getStatIconAndColor } from "../utils/statMap";
import EmptyState from "../components/pages/patientList/EmptyState";

const HomeScreen = () => {
  const doctorName = "Dr. Smith";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <GradientBackground>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{getGreeting(currentTime)}</Text>
            <Text style={styles.doctorName}>{doctorName}</Text>
            <Text style={styles.currentTime}>
              {formatDateToTime(currentTime)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/")}
            activeOpacity={0.7}
          >
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={20} color="#667eea" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Today's Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Today&apos;s Overview</Text>
          <View style={styles.statsGrid}>
            {statInfo.map((stat) => {
              const { icon, color } = getStatIconAndColor(stat.title);
              return (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={icon}
                  color={color}
                />
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((item) => (
              <QuickActionCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivityContainer}>
          <View style={styles.recentActivityHeader}>
            <Text style={styles.sectionTitle2}>Recent Activity</Text>
            <TouchableOpacity
              onPress={() => router.push("/translation/history")}
              activeOpacity={0.7}
            >
              <Text style={globalStyles.linkText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentActivity.length ? (
            <View style={styles.activityList}>
              {recentActivity.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))}
            </View>
          ) : (
            <EmptyState
              searchQuery={1}
              text="No Recent Activity"
              subtext1="You have no recent activity."
              iconName="time-outline"
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  currentTime: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
    marginTop: 2,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  sectionTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  recentActivityContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
  recentActivityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  activityList: {
    gap: 15,
  },
  emergencyContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
});

export default HomeScreen;
