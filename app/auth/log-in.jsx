import InputField from "@/components/form/InputField";
import Button from "@/components/ui/Button";
import GradientBackground from "@/components/ui/GradientBackground";
import globalStyles from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthHeader from "../../components/auth/AuthHeader";
import { login } from "../../utils/api";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login({ email, password });
      router.push("/");
      if (data.success) {
        // Token is already stored by login API
        console.log("Login successful:", data);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Network error");
      console.error(error);
    }
  };

  const navigateToSignup = () => router.push("auth/sign-up");

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
            <AuthHeader subtitle="Welcome back!" />

            {/* Form Container */}
            <View style={globalStyles.formContainer}>
              <View style={globalStyles.formCard}>
                <Text style={globalStyles.formTitle}>Login</Text>
                <Text style={globalStyles.formSubtitle}>
                  Sign in to your account to continue
                </Text>

                <View style={globalStyles.form}>
                  <InputField
                    inputName="email"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    iconName="mail-outline"
                  />

                  <InputField
                    inputName="password"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    iconName="lock-closed-outline"
                    showPasswordToggle={true}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                  />

                  <TouchableOpacity style={globalStyles.forgotPassword}>
                    <Text style={globalStyles.linkText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <Button
                    onPress={handleLogin}
                    text="Login"
                    style={globalStyles.button}
                    gradientStyle={globalStyles.buttonGradient}
                    textStyle={globalStyles.buttonText}
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

              {/* Navigation to Signup */}
              <View style={globalStyles.navigationContainer}>
                <Text style={globalStyles.navigationText}>
                  {"Don't have an account? "}
                </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={globalStyles.navigationLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
