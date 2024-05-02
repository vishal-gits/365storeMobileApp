import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";

export default function Button({
  title,
  onPress,
  style,
  textSize,
  large,
  medium,
  small,
  disabled,
  isLoading,
}) {
  // console.log(textSize);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        large && styles.large,
        medium && styles.medium,
        small && styles.small,
        {
          fontSize: textSize ? textSize : wp("3.5%"),
          // opacity: pressed ? 0.5 : 1,
          backgroundColor: isLoading || pressed ? "red" : "#C37AFF",
          opacity: disabled ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {isLoading && <ActivityIndicator color="white" />}
      <Text style={[styles.text, { marginLeft: isLoading ? 10 : 0 }]}>
        {isLoading ? "Loading..." : title}
      </Text>
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
    flexDirection: "row",
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
  small: {
    width: "30%",
    height: wp("8%"),
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
