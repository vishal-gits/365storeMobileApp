import { View, Text, StyleSheet } from "react-native";
const OrderConfirmationScreen = () => {
  return (
    <View styles={styles.container}>
      <Text styles={styles.text}>OrderConfirmationScreen Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
  },
});

export default OrderConfirmationScreen;
