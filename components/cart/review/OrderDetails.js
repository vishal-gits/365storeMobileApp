import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import ReviewCartProducts from "./ReviewCartProducts";
import ReviewCartSummary from "./ReviewCartSummary";
import ReviewAddress from "./ReviewAddress";
import ReviewShippingPayment from "./ReviewShippingPayment";
import Button from "../../Button";
import { useState } from "react";
const OrderDetails = ({
  shippingAddress,
  billingAddress,
  email,
  deliveryDetails,
  paymentInfo,
  cartValues,
  orderItems,
  orderId,
  orderDate,
  orderNumber,
}) => {
  const [toggleMore, setToggleMore] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        overScrollMode="auto"
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: orderId ? 20 : 5 },
        ]}
      >
        {orderId && (
          <View>
            <Text style={styles.text}>
              We have sent confirmation details to {email}
            </Text>
            <Text style={styles.text}>Order Number: {orderNumber}</Text>
            <Text style={styles.text}>
              Order Date: {new Date(orderDate).toDateString()}
            </Text>
          </View>
        )}
        <ReviewCartProducts {...{ orderItems }} />
        <ReviewCartSummary {...{ cartValues, orderId }} />
        <Pressable
          onPress={() => setToggleMore(!toggleMore)}
          style={[
            styles.pressable,
            {
              opacity: toggleMore ? 0.7 : 1,
              backgroundColor: toggleMore ? "#e6af2e" : "#2196f3",
            },
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              { color: toggleMore ? "#000080" : "#fff" },
            ]}
          >
            {toggleMore ? "...less" : "...more"}
          </Text>
        </Pressable>
        {toggleMore && (
          <>
            <ReviewAddress
              {...{ shippingAddress, billingAddress, email, orderId }}
            />
            <ReviewShippingPayment
              {...{ deliveryDetails, paymentInfo, orderId }}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingBottom: 10,
  },
  contentContainer: {
    paddingRight: 5,
  },
  text: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  pressable: {
    backgroundColor: "#2196f3",
    width: "30%",
    alignSelf: "flex-start",
    borderRadius: 30,
  },
  toggleText: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OrderDetails;
