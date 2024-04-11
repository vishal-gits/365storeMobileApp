import { View, Text } from "react-native";

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text style={{ fontSize: 30 }}>🌀 Loading...</Text>
    </View>
  );
}
