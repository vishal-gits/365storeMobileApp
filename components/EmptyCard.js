import { View, Text, Image, StyleSheet } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import Button from "./Button";

function EmptyCard({ message }) {
  // console.log(message);
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    borderRadius: 10,
    marginBottom: hp("4%"),
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    padding: 10,
    width: wp("70%"),
    backgroundColor: "#e6af2e",
    height: "60%",
  },
  inner: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
});

export default EmptyCard;
