import { View, StyleSheet, Text } from "react-native";

const ReviewCartSummary = ({ cartValues, orderId }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {orderId ? "Order Summary" : "Cart Summary"}
      </Text>
      <View style={styles.cartBlock}>
        <View style={styles.cartCols}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>Shipping</Text>
          <Text style={styles.text}>Taxes</Text>
          <Text style={[styles.text, { paddingVertical: 8 }]}>Total</Text>
        </View>
        <View style={[styles.cartCols, { alignItems: "flex-end" }]}>
          <Text style={styles.text}>
            ${(cartValues.subTotal / 100).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            ${(cartValues.shippingTotal / 100).toFixed(2)}
          </Text>
          <Text style={styles.text}>
            ${(cartValues.taxTotal / 100).toFixed(2)}
          </Text>
          <Text style={[styles.text, { paddingVertical: 8 }]}>
            ${(cartValues.total / 100).toFixed(2)}
          </Text>
        </View>
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
  cartBlock: {
    flexDirection: "row",
  },
  cartCols: {
    width: "50%",
  },
  text: {
    // fontStyle: "italic",
    color: "#808080",
    fontWeight: "bold",
  },
});

export default ReviewCartSummary;
