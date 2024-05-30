import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const PasswordInput = ({ setPassword, password }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={(e) => {
          setPassword(e);
        }}
        style={styles.input}
        value={password}
        secureTextEntry={!showPassword}
      />
      <Feather
        name={showPassword ? "eye" : "eye-off"}
        size={24}
        color="black"
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },
  input: {
    flex: 1,
    padding: 12,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    paddingHorizontal: 15,
  },
});

export default PasswordInput;
