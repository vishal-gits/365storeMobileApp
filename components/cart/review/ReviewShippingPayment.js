import { View, StyleSheet, Text } from "react-native";

const ReviewShippingPayment = ({ deliveryDetails, paymentInfo }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Delivery</Text>
        <Text>Details: </Text>
        <Text style={styles.text}>
          {deliveryDetails.name} ( ${(deliveryDetails.amount / 100).toFixed(2)})
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Payment</Text>
        <Text>Payment Method:</Text>
        <Text style={styles.text}>
          {paymentInfo ? `Credit Card: ${paymentInfo.brand}` : "Test Payment"}
        </Text>
      </View>
    </>
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

  text: {
    // fontStyle: "italic",
    color: "#808080",
    fontWeight: "bold",
  },
});

export default ReviewShippingPayment;
