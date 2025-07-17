import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "react-native-web";
import globalStyles from "../../../styles/global";

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  required = false,
  keyboardType = "default",
  multiline = false,
  editable = true,
  onPress,
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TouchableOpacity
        style={[
          globalStyles.inputContainer,
          multiline && styles.multilineInput,
          !editable && styles.disabledInput,
        ]}
        onPress={onPress}
        disabled={editable}
        activeOpacity={editable ? 1 : 0.7}
      >
        <Ionicons
          name={icon}
          size={20}
          color="#666"
          style={globalStyles.inputIcon}
        />
        {editable ? (
          <TextInput
            style={[globalStyles.input, multiline && styles.multilineTextInput]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#999"
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            textAlignVertical={multiline ? "top" : "center"}
          />
        ) : (
          <Text style={[globalStyles.input, !value && styles.placeholderText]}>
            {value || placeholder}
          </Text>
        )}
        {!editable && <Ionicons name="chevron-down" size={20} color="#666" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  inputGroup: {
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#ff6b6b",
  },
  multilineInput: {
    height: 100,
    alignItems: "flex-start",
    paddingTop: 15,
  },
  multilineTextInput: {
    height: 70,
    textAlignVertical: "top",
  },
  disabledInput: {
    backgroundColor: "#f8f9fa",
  },
  placeholderText: {
    color: "#999",
  },
};
