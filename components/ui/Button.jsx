import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Button = ({ onPress, text, style, gradientStyle, textStyle }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <LinearGradient
      colors={["#ff6b6b", "#feca57"]}
      style={gradientStyle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={textStyle}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default Button;
