
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  listenCleaningOrders,
  CleaningOrder,
} from "../../../../services/notes";

export default function Orders() {

  const [orders, setOrders] = useState<CleaningOrder[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from Firebase in real time
  useEffect(() => {

    const unsubscribe = listenCleaningOrders((data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Cleaning Orders
      </Text>

      <Text style={styles.subtitle}>
        View all organized cleaning activities
      </Text>

      {/* Loading */}

      {loading && (
        <ActivityIndicator
          size="large"
          color="#146C43"
        />
      )}

      {/* No Orders */}

      {!loading && orders.length === 0 && (

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No cleaning orders available yet.
          </Text>
        </View>

      )}

      {/* Display Orders */}

      {!loading && orders.map((item) => (

        <View
          key={item.id}
          style={styles.card}
        >

          <Text style={styles.orderTitle}>
            {item.organizerName}
          </Text>

          <View style={styles.statusContainer}>
            <Text style={styles.status}>
              {item.status?.toUpperCase()}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Cleaning Date
          </Text>

          <Text style={styles.value}>
            {item.cleaningDate}
          </Text>

          <Text style={styles.label}>
            Contact Number
          </Text>

          <Text style={styles.value}>
            {item.contact}
          </Text>

          <Text style={styles.label}>
            Number of Volunteers
          </Text>

          <Text style={styles.value}>
            {item.volunteerCount}
          </Text>

          <Text style={styles.label}>
            Request ID
          </Text>

          <Text style={styles.requestId}>
            {item.requestId}
          </Text>

        </View>

      ))}

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F8F5",
    padding: 18,
  },

  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#146C43",
    marginTop: 35,
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 7,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 13,
    marginBottom: 18,
    elevation: 3,
  },

  orderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#146C43",
  },

  statusContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },

  status: {
    color: "#856404",
    fontSize: 12,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },

  label: {
    fontSize: 13,
    color: "#777",
    marginTop: 12,
  },

  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
    marginTop: 4,
  },

  requestId: {
    fontSize: 12,
    color: "#146C43",
    marginTop: 4,
  },

  emptyContainer: {
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
  },

  emptyText: {
    color: "#777",
    fontSize: 15,
  },

});
