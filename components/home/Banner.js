import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";

export default function Banner() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        <Text>Shop all 365 days with great Deals </Text>
        <Text>Powered up on all 365 days</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#e6af2e",
    width: "100%",
    paddingVertical: 10,
  },
  content: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});
