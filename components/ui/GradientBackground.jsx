import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../../styles/global";

const GradientBackground = ({ children, style, ...props }) => (
  <LinearGradient
    colors={["#667eea", "#764ba2"]}
    style={style || globalStyles.gradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    {...props}
  >
    {children}
  </LinearGradient>
);

export default GradientBackground;
