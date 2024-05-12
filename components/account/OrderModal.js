import { View, StyleSheet, Text, StatusBar } from "react-native";
import Button from "../Button";
import OrderDetails from "../cart/review/OrderDetails";

const OrderModal = ({ isModalVisible, setIsModalVisible, order }) => {
  console.log(order.display_id, "--from orderModal");
  const orderId = order?.id;
  console.log(orderId, "---orderId from orderModal");
  const orderItems = order?.items;
  const shippingAddress = order?.shipping_address ?? "";
  const email = order?.email ?? "";
  const deliveryDetails = {
    name: order?.shipping_methods[0].shipping_option?.name,
    amount: order?.shipping_methods[0].shipping_option?.amount,
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

  const orderStatus = {
    status: order.status,
    payment: order?.payment_status,
    fulfillment: order?.fulfillment_status,
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Order</Text>
        <Button
          title="close"
          onPress={() => setIsModalVisible(false)}
          small={true}
        />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>
          Details for order Number {orderNumber}
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
            orderStatus,
          }}
          noEmailText={true}
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
    justifyContent: "space-around",
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

export default OrderModal;
