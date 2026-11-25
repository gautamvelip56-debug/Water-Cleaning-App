
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import {
  addCleaningRequest,
  addCleaningOrder,
  listenCleaningRequests,
  CleaningRequest,
} from "../../../../services/notes";
import { logoutUser } from '../../../../services/Authservices';

// =====================================
// MAIN INDEX SCREEN
// =====================================

export default function Index() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("request");

  const [loading, setLoading] = useState(false);

  const [requests, setRequests] = useState<CleaningRequest[]>([]);

  const [selectedRequest, setSelectedRequest] = useState("");

  // =====================================
  // CLEANING REQUEST FORM
  // =====================================

  const [description, setDescription] = useState("");
  const [locationName, setLocationName] = useState("");
  const [riverName, setRiverName] = useState("");
  const [pollutionType, setPollutionType] = useState("");
  const [waterbodyType, setWaterbodyType] = useState("river");
  const [imageUrl, setImageUrl] = useState("");

  // =====================================
  // CLEANING ORDER FORM
  // =====================================

  const [organizerName, setOrganizerName] = useState("");
  const [contact, setContact] = useState("");
  const [cleaningDate, setCleaningDate] = useState("");
  const [volunteerCount, setVolunteerCount] = useState("");

  // =====================================
  // FETCH REQUESTS FROM FIREBASE
  // =====================================

  useEffect(() => {

    const unsubscribe = listenCleaningRequests((data) => {
      setRequests(data);
    });

    return () => unsubscribe();

  }, []);

  // =====================================
  // CREATE CLEANING REQUEST
  // =====================================

  const handleCreateRequest = async () => {

    if (
      !description ||
      !locationName ||
      !riverName ||
      !pollutionType
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {

      setLoading(true);

      await addCleaningRequest({

        description: description,
        imageUrl: imageUrl,
        locationName: locationName,
        pollutionType: pollutionType,
        riverName: riverName,
        status: "open",
        waterbodyType: waterbodyType,

      });

      Alert.alert(
        "Success",
        "Cleaning request created successfully!"
      );

      setDescription("");
      setLocationName("");
      setRiverName("");
      setPollutionType("");
      setImageUrl("");
      setWaterbodyType("river");

    } catch (error) {

      Alert.alert("Error", "Unable to create cleaning request");

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // =====================================
  // CREATE CLEANING ORDER
  // =====================================

  const handleCreateOrder = async () => {

    if (
      !selectedRequest ||
      !organizerName ||
      !contact ||
      !cleaningDate ||
      !volunteerCount
    ) {
      Alert.alert("Error", "Please fill all fields and select a request");
      return;
    }

    try {

      setLoading(true);

      await addCleaningOrder({

        cleaningDate: cleaningDate,
        contact: contact,
        organizerName: organizerName,
        requestId: selectedRequest,
        status: "pending",
        volunteerCount: volunteerCount,

      });

      Alert.alert(
        "Success",
        "Cleaning order created successfully!"
      );

      setOrganizerName("");
      setContact("");
      setCleaningDate("");
      setVolunteerCount("");
      setSelectedRequest("");

    } catch (error) {

      Alert.alert("Error", "Unable to create cleaning order");

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // =====================================
  // REUSABLE INPUT
  // =====================================

  const renderInput = (
    label: string,
    value: string,
    setter: (value: string) => void,
    placeholder: string,
    keyboardType: any = "default"
  ) => {

    return (
      <View style={styles.inputContainer}>

        <Text style={styles.label}>{label}</Text>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setter}
          placeholder={placeholder}
          placeholderTextColor="#888"
          keyboardType={keyboardType}
        />

      </View>
    );
  };
  // =====================================
  // HANDLE LOGOUT
  // =====================================
  const handleLogout = async () => {
    try {
      await logoutUser();

      Alert.alert('Success', 'You have logged out successfully!');

      router.replace('/(drawer)/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', 'Unable to logout. Please try again.');
      console.log(error);
    }
  };


  // =====================================
  // SCREEN UI
  // =====================================

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.heading}>
        River Cleaning
      </Text>

      <Text style={styles.subtitle}>
        Help keep our rivers and waterbodies clean.
      </Text>

      {/* TAB BUTTONS */}

      <View style={styles.tabContainer}>

        <Pressable
          style={[
            styles.tab,
            activeTab === "request" && styles.activeTab
          ]}
          onPress={() => setActiveTab("request")}
        >

          <Text style={[
            styles.tabText,
            activeTab === "request" && styles.activeTabText
          ]}>
            Create Request
          </Text>

        </Pressable>

        <Pressable
          style={[
            styles.tab,
            activeTab === "order" && styles.activeTab
          ]}
          onPress={() => setActiveTab("order")}
        >

          <Text style={[
            styles.tabText,
            activeTab === "order" && styles.activeTabText
          ]}>
            Create Order
          </Text>

        </Pressable>

      </View>

      {/* ================================= */}
      {/* CLEANING REQUEST FORM */}
      {/* ================================= */}

      {activeTab === "request" && (

        <View style={styles.form}>

          <Text style={styles.formHeading}>
            Create Cleaning Request
          </Text>

          <Text style={styles.info}>
            Report a polluted river or tributary.
          </Text>

          {renderInput(
            "River / Waterbody Name",
            riverName,
            setRiverName,
            "Enter river name"
          )}

          {renderInput(
            "Location",
            locationName,
            setLocationName,
            "Example: Curtolim, Goa"
          )}

          <Text style={styles.label}>
            Waterbody Type
          </Text>

          <View style={styles.optionContainer}>

            {["river", "tributary", "lake", "pond"].map((item) => (

              <Pressable
                key={item}
                style={[
                  styles.option,
                  waterbodyType === item && styles.selectedOption
                ]}
                onPress={() => setWaterbodyType(item)}
              >

                <Text style={[
                  styles.optionText,
                  waterbodyType === item && styles.selectedOptionText
                ]}>
                  {item}
                </Text>

              </Pressable>

            ))}

          </View>

          {renderInput(
            "Pollution Type",
            pollutionType,
            setPollutionType,
            "Example: Plastic, sewage, garbage"
          )}

          {renderInput(
            "Description",
            description,
            setDescription,
            "Describe the pollution problem"
          )}

          {renderInput(
            "Image URL (Optional)",
            imageUrl,
            setImageUrl,
            "Paste image URL"
          )}

          <Pressable
            style={styles.submitButton}
            onPress={handleCreateRequest}
            disabled={loading}
          >

            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>
                Submit Cleaning Request
              </Text>
            )}

          </Pressable>

        </View>

      )}

      {/* ================================= */}
      {/* CLEANING ORDER FORM */}
      {/* ================================= */}

      {activeTab === "order" && (

        <View style={styles.form}>

          <Text style={styles.formHeading}>
            Organize Cleaning Activity
          </Text>

          <Text style={styles.info}>
            Select a reported pollution location and organize a cleanup.
          </Text>

          <Text style={styles.label}>
            Select Cleaning Request
          </Text>

          {requests.filter((item) => item.status === "open").length === 0 ? (

            <Text style={styles.emptyText}>
              No open cleaning requests available.
              Create a request first.
            </Text>

          ) : (

            requests
              .filter((item) => item.status === "open")
              .map((item) => (

                <Pressable
                  key={item.id}
                  style={[
                    styles.requestCard,
                    selectedRequest === item.id && styles.selectedRequest
                  ]}
                  onPress={() => setSelectedRequest(item.id || "")}
                >

                  <Text style={styles.requestTitle}>
                    {item.riverName}
                  </Text>

                  <Text style={styles.requestDetail}>
                    Location: {item.locationName}
                  </Text>

                  <Text style={styles.requestDetail}>
                    Pollution: {item.pollutionType}
                  </Text>

                  <Text style={styles.selectText}>
                    {selectedRequest === item.id
                      ? "✓ Selected"
                      : "Select this request"}
                  </Text>

                </Pressable>

              ))

          )}

          {renderInput(
            "Organizer Name",
            organizerName,
            setOrganizerName,
            "Enter your name"
          )}

          {renderInput(
            "Contact Number",
            contact,
            setContact,
            "Enter mobile number",
            "phone-pad"
          )}

          {renderInput(
            "Cleaning Date",
            cleaningDate,
            setCleaningDate,
            "YYYY-MM-DD"
          )}

          {renderInput(
            "Number of Volunteers",
            volunteerCount,
            setVolunteerCount,
            "Enter volunteer count",
            "numeric"
          )}

          <Pressable
            style={styles.submitButton}
            onPress={handleCreateOrder}
            disabled={loading}
          >

            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>
                Submit Cleaning Order
              </Text>
            )}

          </Pressable>
        </View>
        


      )}
      <View>
        <Pressable
         style={styles.submitButton}
         onPress={() => router.push("/order")}
         >
        <Text style={styles.submitText}>
          View Cleaning Orders
         </Text>
        </Pressable>
      </View>
    </ScrollView>

  );

}

// =====================================
// STYLES
// =====================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F8F5",
  },

  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#146C43",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 25,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E1EAE4",
    borderRadius: 12,
    padding: 5,
    marginBottom: 25,
  },

  tab: {
    flex: 1,
    padding: 13,
    alignItems: "center",
    borderRadius: 9,
  },

  activeTab: {
    backgroundColor: "#146C43",
  },

  tabText: {
    color: "#555",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#fff",
  },

  form: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    elevation: 3,
  },

  formHeading: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#146C43",
    marginBottom: 8,
  },

  info: {
    color: "#777",
    marginBottom: 22,
    fontSize: 13,
  },

  inputContainer: {
    marginBottom: 17,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
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

  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
    gap: 8,
  },

  option: {
    borderWidth: 1,
    borderColor: "#B9C9BE",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  selectedOption: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },

  optionText: {
    color: "#444",
    textTransform: "capitalize",
  },

  selectedOptionText: {
    color: "#fff",
  },

  requestCard: {
    borderWidth: 1,
    borderColor: "#D5DDD7",
    padding: 13,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#FAFCFA",
  },

  selectedRequest: {
    borderColor: "#146C43",
    backgroundColor: "#E8F5EC",
    borderWidth: 2,
  },

  requestTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#146C43",
  },

  requestDetail: {
    color: "#555",
    marginTop: 5,
    fontSize: 13,
  },

  selectText: {
    color: "#146C43",
    fontWeight: "bold",
    marginTop: 10,
  },

  emptyText: {
    color: "#B45309",
    marginBottom: 18,
    lineHeight: 22,
  },

  submitButton: {
    backgroundColor: "#146C43",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
   logoutButton: {
    flex:1,
    alignContent:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor: '#e53935',
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 10,
  },
   logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
