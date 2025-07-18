import { languages } from "@/constants/dummy";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthHeader from "../../components/auth/AuthHeader";
import InputField from "../../components/form/InputField";
import Button from "../../components/ui/Button";
import { register } from "../../utils/api";
import GradientBackground from "../../components/ui/GradientBackground";
import SelectModal from "../../components/ui/SelectModal";
import globalStyles from "../../styles/global";

const SignupScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleSignup = async () => {
    try {
      const data = await register({ fullName, email, password, language });
      router.push("/auth/log-in");

      if (data.token) {
        console.log("Signup successful:", data);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Network error");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <GradientBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={globalStyles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={globalStyles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <AuthHeader subtitle="Create your account" />

            {/* Form Container */}
            <View style={globalStyles.formContainer}>
              <View style={globalStyles.formCard}>
                <Text style={globalStyles.formTitle}>Sign Up</Text>
                <Text style={globalStyles.formSubtitle}>
                  Join us and start translating instantly
                </Text>

                <View style={globalStyles.form}>
                  <InputField
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    icon="person-outline"
                  />

                  <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    icon="mail-outline"
                  />

                  <InputField
                    placeholder="Preferred Language"
                    value={language}
                    icon="language-outline"
                    editable={false}
                    onPress={() => setShowLanguageModal(true)}
                  />

                  <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    icon="lock-closed-outline"
                    showPasswordToggle={true}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                  />

                  {/* Terms and Conditions */}
                  <View style={styles.termsContainer}>
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => setAcceptTerms(!acceptTerms)}
                    >
                      <View
                        style={[
                          styles.checkboxBox,
                          acceptTerms && styles.checkboxChecked,
                        ]}
                      >
                        {acceptTerms && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                      </View>
                      <Text style={styles.termsText}>
                        I agree to the{" "}
                        <Text style={styles.termsLink}>Terms of Service</Text>{" "}
                        and <Text style={styles.termsLink}>Privacy Policy</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Button
                    onPress={handleSignup}
                    text="Sign Up"
                    style={[
                      globalStyles.button,
                      !acceptTerms && styles.signupButtonDisabled,
                    ]}
                    gradientStyle={globalStyles.buttonGradient}
                    textStyle={globalStyles.buttonText}
                    disabled={!acceptTerms}
                  />

                  <View style={globalStyles.dividerContainer}>
                    <View style={globalStyles.divider} />
                    <Text style={globalStyles.dividerText}>
                      or continue with
                    </Text>
                    <View style={globalStyles.divider} />
                  </View>

                  <View style={globalStyles.socialContainer}>
                    <TouchableOpacity style={globalStyles.socialButton}>
                      <Ionicons name="logo-google" size={24} color="#db4437" />
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.socialButton}>
                      <Ionicons
                        name="logo-facebook"
                        size={24}
                        color="#4267B2"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.socialButton}>
                      <Ionicons name="logo-apple" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Navigation to Login */}
              <View style={globalStyles.navigationContainer}>
                <Text style={globalStyles.navigationText}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("auth/log-in")}>
                  <Text style={globalStyles.navigationLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Language Selection Modal */}
            <SelectModal
              visible={showLanguageModal}
              onClose={() => setShowLanguageModal(false)}
              title="Select Language"
              options={languages}
              selectedValue={language}
              onSelect={(value) => setLanguage(value)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#667eea",
    borderColor: "#667eea",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  termsLink: {
    color: "#667eea",
    fontWeight: "600",
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
});

export default SignupScreen;
