import { View, Text, ActivityIndicator } from "react-native";

export default function Loading({ loadingText }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <ActivityIndicator size="200" color="red" />
      <Text style={{ fontSize: 30, textAlign: "center", color: "red" }}>
        {loadingText || "Loading..."}
      </Text>
    </View>
  );
}
