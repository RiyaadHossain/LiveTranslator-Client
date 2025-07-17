import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { TextInput, View } from "react-native-web";
import globalStyles from "../../styles/global";

  const InputField = ({
    inputName,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    iconName,
    showPasswordToggle = false,
    onTogglePassword,
    showPassword = false,
  }) => (
    <View style={globalStyles.inputContainer}>
      <Ionicons
        name={iconName}
        size={20}
        color="#666"
        style={globalStyles.inputIcon}
      />
      <TextInput
        id={inputName}
        style={globalStyles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {showPasswordToggle && (
        <TouchableOpacity onPress={onTogglePassword} style={globalStyles.eyeIcon}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      )}
    </View>
);
  
export default InputField;