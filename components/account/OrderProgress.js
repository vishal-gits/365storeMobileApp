import { View, Text, StyleSheet } from "react-native";

const OrderProgress = ({ orderStatus }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Order Status</Text>
      <View style={styles.row}>
        <Text>Status: {orderStatus.status}</Text>
        <Text>Payment: {orderStatus.payment}</Text>
        <Text>Fulfillment: {orderStatus.fulfillment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderColor: "#a5a5a5",
    marginVertical: 5,
    paddingTop: 5,
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 2,
  },
  row: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 10,
    backgroundColor: "#f5f5f5",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  text: {
    // fontStyle: "italic",
    color: "#808080",
    fontWeight: "bold",
  },
});
export default OrderProgress;
