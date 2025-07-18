import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../../styles/global";
import BackButton from "../../components/ui/BackButton";
import Button from "@/components/ui/Button";
import { addPatient } from "../../utils/api";
import { languages, bloodTypes, genders } from "../../constants/dummy";
import InputField from "../../components/form/InputField";
import { router } from "expo-router";
import SelectModal from "../../components/ui/SelectModal";

const AddPatientScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    language: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalCondition: "",
    allergies: "",
    medications: "",
    insuranceId: "",
    bloodType: "",
    notes: "",
  });

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showBloodTypeModal, setShowBloodTypeModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // eslint-disable-next-line no-unused-vars
  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "phone", "language"];
    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (missingFields.length > 0) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields: " + missingFields.join(", ")
      );
      return false;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      Alert.alert("Invalid Phone", "Please enter a valid phone number");
      return false;
    }

    // Email validation if provided
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Uncomment to enable validation
    // if (!validateForm()) { setIsSubmitting(false); return; }

    try {
      const response = await addPatient(formData);
      console.log(response);

      Alert.alert("Success", "Patient added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
      router.push("/patients/list");
    } catch (error) {
      Alert.alert("Error", "Failed to add patient. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <KeyboardAvoidingView
        style={globalStyles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
              <Text style={styles.headerTitle}>Add New Patient</Text>
              <Text style={styles.headerSubtitle}>Fill in patient details</Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <ScrollView
              style={styles.formScroll}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={globalStyles.formCard}>
                <Text style={globalStyles.formTitle}>Personal Information</Text>
                <Text style={globalStyles.formSubtitle}>
                  Basic patient details
                </Text>

                <View style={styles.formContent}>
                  <View style={styles.rowInputs}>
                    <View style={styles.halfWidth}>
                      <InputField
                        label="First Name"
                        value={formData.firstName}
                        onChangeText={(value) =>
                          updateFormData("firstName", value)
                        }
                        placeholder="Enter first name"
                        icon="person-outline"
                        required={true}
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <InputField
                        label="Last Name"
                        value={formData.lastName}
                        onChangeText={(value) =>
                          updateFormData("lastName", value)
                        }
                        placeholder="Enter last name"
                        icon="person-outline"
                        required={true}
                      />
                    </View>
                  </View>

                  <View style={styles.rowInputs}>
                    <View style={styles.halfWidth}>
                      <InputField
                        label="Date of Birth"
                        value={formData.dateOfBirth}
                        onChangeText={(value) =>
                          updateFormData("dateOfBirth", value)
                        }
                        placeholder="MM/DD/YYYY"
                        icon="calendar-outline"
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <InputField
                        label="Age"
                        value={formData.age}
                        onChangeText={(value) => updateFormData("age", value)}
                        placeholder="Enter age"
                        icon="time-outline"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <InputField
                    label="Gender"
                    value={formData.gender}
                    placeholder="Select gender"
                    icon="person-outline"
                    editable={false}
                    onPress={() => setShowGenderModal(true)}
                  />

                  <InputField
                    label="Phone Number"
                    value={formData.phone}
                    onChangeText={(value) => updateFormData("phone", value)}
                    placeholder="Enter phone number"
                    icon="call-outline"
                    keyboardType="phone-pad"
                    required={true}
                  />

                  <InputField
                    label="Email Address"
                    value={formData.email}
                    onChangeText={(value) => updateFormData("email", value)}
                    placeholder="Enter email address"
                    icon="mail-outline"
                    keyboardType="email-address"
                  />

                  <InputField
                    label="Primary Language"
                    value={formData.language}
                    placeholder="Select language"
                    icon="language-outline"
                    editable={false}
                    onPress={() => setShowLanguageModal(true)}
                    required={true}
                  />

                  <InputField
                    label="Address"
                    value={formData.address}
                    onChangeText={(value) => updateFormData("address", value)}
                    placeholder="Enter home address"
                    icon="location-outline"
                    multiline={true}
                  />
                </View>
              </View>

              <View style={globalStyles.formCard}>
                <Text style={globalStyles.formTitle}>Emergency Contact</Text>
                <Text style={globalStyles.formSubtitle}>
                  Emergency contact information
                </Text>

                <View style={styles.formContent}>
                  <InputField
                    label="Emergency Contact Name"
                    value={formData.emergencyContact}
                    onChangeText={(value) =>
                      updateFormData("emergencyContact", value)
                    }
                    placeholder="Enter contact name"
                    icon="person-add-outline"
                  />

                  <InputField
                    label="Emergency Contact Phone"
                    value={formData.emergencyPhone}
                    onChangeText={(value) =>
                      updateFormData("emergencyPhone", value)
                    }
                    placeholder="Enter contact phone"
                    icon="call-outline"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={globalStyles.formCard}>
                <Text style={globalStyles.formTitle}>Medical Information</Text>
                <Text style={globalStyles.formSubtitle}>
                  Patient medical details
                </Text>

                <View style={styles.formContent}>
                  <InputField
                    label="Medical Condition"
                    value={formData.medicalCondition}
                    onChangeText={(value) =>
                      updateFormData("medicalCondition", value)
                    }
                    placeholder="Primary medical condition"
                    icon="medical-outline"
                  />

                  <InputField
                    label="Allergies"
                    value={formData.allergies}
                    onChangeText={(value) => updateFormData("allergies", value)}
                    placeholder="Known allergies"
                    icon="warning-outline"
                    multiline={true}
                  />

                  <InputField
                    label="Current Medications"
                    value={formData.medications}
                    onChangeText={(value) =>
                      updateFormData("medications", value)
                    }
                    placeholder="List current medications"
                    icon="medkit-outline"
                    multiline={true}
                  />

                  <View style={styles.rowInputs}>
                    <View style={styles.halfWidth}>
                      <InputField
                        label="Blood Type"
                        value={formData.bloodType}
                        placeholder="Blood type"
                        icon="water-outline"
                        editable={false}
                        onPress={() => setShowBloodTypeModal(true)}
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <InputField
                        label="Insurance ID"
                        value={formData.insuranceId}
                        onChangeText={(value) =>
                          updateFormData("insuranceId", value)
                        }
                        placeholder="Insurance ID"
                        icon="card-outline"
                      />
                    </View>
                  </View>

                  <InputField
                    label="Additional Notes"
                    value={formData.notes}
                    onChangeText={(value) => updateFormData("notes", value)}
                    placeholder="Any additional notes..."
                    icon="document-text-outline"
                    multiline={true}
                  />
                </View>
              </View>

              {/* Submit Button */}
              <View style={styles.submitContainer}>
                <Button
                  onPress={handleSubmit}
                  text={isSubmitting ? "Submitting..." : "Add Patient"}
                  style={globalStyles.button}
                  gradientStyle={globalStyles.buttonGradient}
                  textStyle={globalStyles.buttonText}
                />
              </View>
            </ScrollView>
          </View>

          {/* Modals */}
          <SelectModal
            visible={showLanguageModal}
            onClose={() => setShowLanguageModal(false)}
            title="Select Language"
            options={languages}
            selectedValue={formData.language}
            onSelect={(value) => updateFormData("language", value)}
          />

          <SelectModal
            visible={showGenderModal}
            onClose={() => setShowGenderModal(false)}
            title="Select Gender"
            options={genders}
            selectedValue={formData.gender}
            onSelect={(value) => updateFormData("gender", value)}
          />

          <SelectModal
            visible={showBloodTypeModal}
            onClose={() => setShowBloodTypeModal(false)}
            title="Select Blood Type"
            options={bloodTypes}
            selectedValue={formData.bloodType}
            onSelect={(value) => updateFormData("bloodType", value)}
          />
        </LinearGradient>
      </KeyboardAvoidingView>
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
  headerSpacer: {
    width: 40,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  formScroll: {
    flex: 1,
  },
  formContent: {
    gap: 20,
  },

  rowInputs: {
    flexDirection: "row",
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  submitContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submittingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default AddPatientScreen;
