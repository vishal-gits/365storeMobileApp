import { View, Text, StyleSheet } from "react-native";
const ConfirmedOrderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>
        Congratulations, Your Order is confirmed.
      </Text>
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
