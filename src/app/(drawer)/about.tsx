
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface ExploreScreenProps {
  onBack?: () => void;
}

export default function ExploreScreen({
  onBack,
}: ExploreScreenProps) {
  const activities = [
    {
      icon: "🌊",
      title: "River Cleaning",
      description:
        "Removing plastic, garbage and other waste materials from rivers and riverbanks.",
    },
    {
      icon: "♻️",
      title: "Plastic Waste Collection",
      description:
        "Collecting plastic bottles, bags and other non-biodegradable waste.",
    },
    {
      icon: "🧹",
      title: "Riverbank Cleaning",
      description:
        "Cleaning surrounding areas and preventing waste from entering rivers.",
    },
    {
      icon: "🌱",
      title: "Environmental Awareness",
      description:
        "Educating people about water pollution and encouraging responsible waste disposal.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Identify Pollution",
      description:
        "Find polluted rivers, lakes or water bodies that require cleaning.",
    },
    {
      number: "02",
      title: "Submit a Cleaning Request",
      description:
        "Report the pollution with its description, location and photographs.",
    },
    {
      number: "03",
      title: "Organize a Cleaning Activity",
      description:
        "Create a cleaning order by selecting a date and adding organizer and volunteer details.",
    },
    {
      number: "04",
      title: "Perform Cleaning",
      description:
        "Volunteers collect waste and clean the polluted area using appropriate safety equipment.",
    },
    {
      number: "05",
      title: "Update Activity Status",
      description:
        "Update the cleaning activity status after the work is completed.",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        )}

        <View>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>
            Discover our environmental activities
          </Text>
        </View>
      </View>

      {/* INTRODUCTION */}

      <View style={styles.heroCard}>
        <Text style={styles.heroIcon}>🌍</Text>

        <Text style={styles.heroTitle}>
          Together for Cleaner Rivers
        </Text>

        <Text style={styles.heroDescription}>
          Our mission is to reduce water pollution,
          organize cleaning activities and create
          awareness about protecting our environment.
        </Text>
      </View>

      {/* OUR WORK */}

      <Text style={styles.sectionTitle}>
        What Work Do We Do?
      </Text>

      {activities.map((item, index) => (
        <View style={styles.activityCard} key={index}>
          <Text style={styles.activityIcon}>
            {item.icon}
          </Text>

          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>
              {item.title}
            </Text>

            <Text style={styles.activityDescription}>
              {item.description}
            </Text>
          </View>
        </View>
      ))}

      {/* HOW WE WORK */}

      <Text style={styles.sectionTitle}>
        How We Perform Our Work
      </Text>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View style={styles.stepCard} key={index}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>
                {step.number}
              </Text>
            </View>

            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>
                {step.title}
              </Text>

              <Text style={styles.stepDescription}>
                {step.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* PROJECT TECHNOLOGY */}

      <Text style={styles.sectionTitle}>
        Technology We Use
      </Text>

      <View style={styles.techCard}>
        <Text style={styles.techTitle}>
          Application Development
        </Text>

        <Text style={styles.techText}>
          📱 React Native - Mobile application development
        </Text>

        <Text style={styles.techText}>
          💻 TypeScript - Application programming
        </Text>

        <Text style={styles.techText}>
          🔥 Firebase - Backend services
        </Text>

        <Text style={styles.techText}>
          🗄️ Cloud Firestore - Storing cleaning requests
          and cleaning orders
        </Text>
      </View>

      {/* DATABASE INFORMATION */}

      <Text style={styles.sectionTitle}>
        How Our System Works
      </Text>

      <View style={styles.databaseCard}>
        <Text style={styles.databaseTitle}>
          1. Cleaning Requests
        </Text>

        <Text style={styles.databaseDescription}>
          Pollution reports are stored in the
          cleaningRequests collection in Firebase.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.databaseTitle}>
          2. Cleaning Orders
        </Text>

        <Text style={styles.databaseDescription}>
          Scheduled cleaning activities are stored
          separately in the cleaningOrders collection.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.databaseTitle}>
          3. Real-time Data
        </Text>

        <Text style={styles.databaseDescription}>
          Firebase provides real-time updates so
          the application can display new requests
          and changes in cleaning activities.
        </Text>
      </View>

      {/* FOOTER */}

      <View style={styles.footer}>
        <Text style={styles.footerIcon}>💚</Text>

        <Text style={styles.footerTitle}>
          Save Water, Save Life
        </Text>

        <Text style={styles.footerText}>
          Every action towards a cleaner environment
          creates a better future.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8F6",
    padding: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 22,
  },

  backButton: {
    width: 42,
    height: 42,
    backgroundColor: "#087F5B",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 32,
    marginTop: -5,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#087F5B",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  heroCard: {
    backgroundColor: "#087F5B",
    padding: 24,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 28,
  },

  heroIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  heroTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  heroDescription: {
    fontSize: 14,
    color: "#E8FFF5",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
    marginTop: 8,
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  activityIcon: {
    fontSize: 32,
    marginRight: 15,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#087F5B",
    marginBottom: 5,
  },

  activityDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },

  stepsContainer: {
    marginBottom: 20,
  },

  stepCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "flex-start",
    elevation: 2,
  },

  stepNumber: {
    width: 42,
    height: 42,
    backgroundColor: "#DDF4E9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  stepNumberText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#087F5B",
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#087F5B",
    marginBottom: 6,
  },

  stepDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },

  techCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
  },

  techTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#087F5B",
    marginBottom: 15,
  },

  techText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 13,
    lineHeight: 20,
  },

  databaseCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
  },

  databaseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#087F5B",
    marginBottom: 7,
  },

  databaseDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 15,
  },

  footer: {
    backgroundColor: "#DDF4E9",
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 5,
  },

  footerIcon: {
    fontSize: 35,
    marginBottom: 8,
  },

  footerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#087F5B",
  },

  footerText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },
});
