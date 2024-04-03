import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Button({ title, onPress, style, textSize }) {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.text, { fontSize: textSize ? textSize : wp("3.5%") }]}
        onPress={onPress}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C37AFF",
    padding: 5,
    width: wp("20%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 59,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
