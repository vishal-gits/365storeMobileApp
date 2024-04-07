import { View, Text, StyleSheet } from "react-native";
const StoreScreen = () => {
  return (
    <View styles={styles.container}>
      <Text styles={styles.text}>StoreScreen Screen</Text>
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

export default StoreScreen;
