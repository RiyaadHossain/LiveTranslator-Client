import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../../styles/global";
import Logo from "../ui/Logo";

const AuthHeader = ({ title, subtitle }) => (
  <View style={globalStyles.header}>
    <Logo />
    <Text style={globalStyles.appName}>Realtime Translator</Text>
    <Text style={globalStyles.subtitle}>{subtitle}</Text>
  </View>
);

export default AuthHeader;
