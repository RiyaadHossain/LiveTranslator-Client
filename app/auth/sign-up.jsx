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
import InputField from "../../components/form/Input";
import Button from "../../components/ui/Button";
import GradientBackground from "../../components/ui/GradientBackground";
import globalStyles from "../../styles/global";

const SignupScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignup = () => {
    // Handle signup logic here
    console.log("Signup", { fullName, email, password });
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
                    iconName="person-outline"
                  />

                  <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    iconName="mail-outline"
                  />

                  <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    iconName="lock-closed-outline"
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
          </ScrollView>
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
};

// ...existing code...
const styles = StyleSheet.create({
  termsContainer: {
    marginTop: -10,
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
