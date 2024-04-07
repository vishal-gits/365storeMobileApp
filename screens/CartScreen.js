import { View, Text, StyleSheet } from "react-native";
const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CartScreen Screen</Text>
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

export default CartScreen;
