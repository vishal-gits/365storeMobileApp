import { View, Text, StyleSheet } from "react-native";
import { useStoreContext } from "../../globalstore/Store";
import OrderDetails from "../../components/cart/review/OrderDetails";
import Button from "../../components/Button";

const ReviewScreen = ({ route, navigation }) => {
  const { paymentInfo } = route?.params;
  const { state } = useStoreContext();
  const cart = state?.cart ?? "";

  if (cart?.completed_at) {
    return;
  } else {
    const billingAddress = cart?.billing_address ?? "";
    const shippingAddress = cart?.shipping_address ?? "";
    const email = cart?.email ?? "";
    const deliveryMethod = cart?.shipping_methods ?? "";
    const deliveryDetails = {
      name: deliveryMethod[0]?.shipping_option.name ?? "",
      amount: deliveryMethod[0]?.shipping_option.amount ?? "",
    };
    const cartValues = {
      subTotal: cart?.subtotal ?? "",
      shippingTotal: cart?.shipping_total ?? "",
      taxTotal: cart?.tax_total ?? "",
      total: cart?.total ?? "",
    };

    console.log(paymentInfo, "---paymentInfo from OrderScreen");
    return (
      <>
        {!state?.cart?.completed_at && (
          <View style={styles.outer}>
            <View style={styles.container}>
              <Text style={styles.reviewText}>Review Your Order</Text>

              <OrderDetails
                {...{
                  shippingAddress,
                  billingAddress,
                  email,
                  deliveryDetails,
                  paymentInfo,
                  cartValues,
                }}
              />
            </View>

            <Button
              title="Continue to Place Order"
              large="true"
              textSize={25}
              onPress={() => navigation.navigate("Checkout-Order")}
            />
          </View>
        )}
      </>
    );
  }
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    padding: 10,
  },
  container: {
    // margin: hp("2%"),
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 50,
    borderWidth: 5,

    borderColor: "#e6af2e",
    borderRadius: 30,
    flex: 1,
  },
  reviewText: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default ReviewScreen;
