import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native-web";
import globalStyles from "../../styles/global";

export default function Logo() {
  return (
    <View style={globalStyles.logoContainer}>
      <LinearGradient
        colors={["#ff6b6b", "#feca57"]}
        style={globalStyles.logo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="language" size={32} color="#fff" />
      </LinearGradient>
    </View>
  );
}
