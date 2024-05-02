import { View, Text, StyleSheet } from "react-native";
const ConfirmedOrderScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Order Confirmed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConfirmedOrderScreen;
