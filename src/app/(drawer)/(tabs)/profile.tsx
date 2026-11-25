
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

export default function Profile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("Volunteer");

  const handleSave = () => {

    if (!name || !email || !phone) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Profile Updated",
      "Your profile details have been updated!"
    );

  };

  return (

    <ScrollView style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}>

      {/* HEADER */}

      <View style={styles.header}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name ? name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        <Text style={styles.heading}>
          My Profile
        </Text>

        <Text style={styles.subtitle}>
          Manage your account details
        </Text>

      </View>

      {/* PERSONAL DETAILS */}

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>

        <Text style={styles.label}>Full Name *</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email Address *</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contact Number *</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Location</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
        />

      </View>

      {/* ROLE */}

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Your Role
        </Text>

        {["Volunteer", "Organizer", "Both"].map((item) => (

          <Pressable
            key={item}
            style={[
              styles.roleButton,
              role === item && styles.selectedRole
            ]}
            onPress={() => setRole(item)}
          >

            <Text style={[
              styles.roleText,
              role === item && styles.selectedRoleText
            ]}>
              {role === item ? "✓ " : ""}
              {item}
            </Text>

          </Pressable>

        ))}

      </View>

      {/* SAVE BUTTON */}

      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
      >

        <Text style={styles.saveText}>
          Save Profile
        </Text>

      </Pressable>

      <Text style={styles.footer}>
        Together we can keep our rivers clean!
      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F8F5",
  },

  header: {
    alignItems: "center",
    padding: 25,
    paddingTop: 35,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#146C43",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },

  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#146C43",
  },

  subtitle: {
    color: "#777",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#146C43",
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D5DDD7",
    borderRadius: 9,
    padding: 13,
    fontSize: 14,
    color: "#222",
    backgroundColor: "#FAFCFA",
  },

  roleButton: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#D5DDD7",
    borderRadius: 9,
    marginBottom: 10,
  },

  selectedRole: {
    backgroundColor: "#E5F3E9",
    borderColor: "#146C43",
  },

  roleText: {
    color: "#444",
    fontWeight: "500",
  },

  selectedRoleText: {
    color: "#146C43",
    fontWeight: "bold",
  },

  saveButton: {
    backgroundColor: "#146C43",
    marginHorizontal: 18,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    color: "#777",
    marginTop: 22,
  },

});
