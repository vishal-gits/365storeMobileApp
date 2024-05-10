import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useOrderContext } from "../../globalstore/Order";
import { useEffect } from "react";
import baseURL from "../../constants/url";
import OrderDetails from "../../components/cart/review/OrderDetails";
const ConfirmedOrderScreen = () => {
  const { order, updateOrder } = useOrderContext();
  console.log(order, "----order from confirmedOrderScreen");
  console.log(order.items, "----orderItems from confirmedOrderscreen");
  const orderId = order.id;
  const orderItems = order.items;
  const shippingAddress = order?.shipping_address ?? "";
  const email = order?.email ?? "";
  console.log(order.shippingOptionAmount, order.shippingOptionName);
  const deliveryDetails = {
    name: order.shippingOptionName,
    amount: order.shippingOptionAmount,
  };
  const orderNumber = order.display_id;
  const orderDate = order.created_at;
  const cartValues = {
    subTotal: order?.subtotal ?? "",
    shippingTotal: order?.shipping_total ?? "",
    taxTotal: order?.tax_total ?? "",
    total: order?.total ?? "",
  };
  const paymentInfo = {
    amount: order.payments[0].amount,
    created_at: order.payments[0].created_at,
    provider_id: order.payments[0].provider_id,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Order</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>
          Thank you, Your order has been successfully placed
        </Text>

        <OrderDetails
          {...{
            shippingAddress,
            deliveryDetails,
            email,
            orderItems,
            orderId,
            paymentInfo,
            cartValues,
            orderDate,
            orderNumber,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingBottom: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    paddingHorizontal: 5,
  },
  innerContainer: {
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
});

export default ConfirmedOrderScreen;
