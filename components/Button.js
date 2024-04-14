import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Button({
  title,
  onPress,
  style,
  textSize,
  large,
  medium,
  disabled,
}) {
  return (
    // <View
    // // style={[
    // //   styles.container,
    // //   style,
    // //   large && styles.large,
    // //   medium && styles.medium,
    // // ]}
    // >
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        large && styles.large,
        medium && styles.medium,
        {
          fontSize: textSize ? textSize : wp("3.5%"),
          // opacity: pressed ? 0.5 : 1,
          backgroundColor: pressed ? "red" : "#C37AFF",
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
    // </View>
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
  large: {
    width: "100%",
    marginTop: 10,
    height: wp("12%"),
  },
  medium: {
    width: "50%",
    height: wp("12%"),
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
