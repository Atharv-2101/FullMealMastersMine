import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AdminScreen from "../../components/AdminScreen";

export default function UserDetailsScreen({ route }) {
  const userId = route?.params?.userId || "N/A";

  return (
    <AdminScreen title={`User Details (${userId})`}>
      <View style={styles.card}>
        <Text style={styles.title}>User Information</Text>

        <View style={styles.row}>
          <Text style={styles.k}>Name:</Text>
          <Text style={styles.v}>Rahul Farke</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.k}>Mobile:</Text>
          <Text style={styles.v}>9876543210</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.k}>Email:</Text>
          <Text style={styles.v}>rahul@gmail.com</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.k}>Address:</Text>
          <Text style={[styles.v, { textAlign: "right", flex: 1 }]}>
            Hinjewadi Phase 1, Pune
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.k}>Registered On:</Text>
          <Text style={styles.v}>2026-01-12</Text>
        </View>
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    padding: 14,
  },
  title: { fontSize: 16, fontWeight: "900", color: "#12212d", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  k: { fontWeight: "900", color: "#3c4a57" },
  v: { fontWeight: "700", color: "#12212d" },
});
