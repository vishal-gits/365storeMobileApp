import { View, Text, StyleSheet } from "react-native";
import { useCustomerContext } from "../../globalstore/Customer";

const OverviewScreen = () => {
  const { customer } = useCustomerContext();
  console.log(customer, customer?.id, "--- from Overview Screen");
  return (
    <View style={styles.container}>
      <Text>OverviewScreen</Text>
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

export default OverviewScreen;
