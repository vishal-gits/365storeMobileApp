import { View, Text, StyleSheet, ScrollView } from "react-native";
import ReviewCartProducts from "./ReviewCartProducts";
import ReviewCartSummary from "./ReviewCartSummary";
import ReviewAddress from "./ReviewAddress";
import ReviewShippingPayment from "./ReviewShippingPayment";
const ReviewDisplay = ({
  shippingAddress,
  billingAddress,
  email,
  deliveryDetails,
  paymentInfo,
  cartValues,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        overScrollMode="auto"
        contentContainerStyle={styles.contentContainer}
      >
        <ReviewCartProducts />
        <ReviewCartSummary {...{ cartValues }} />
        <ReviewAddress {...{ shippingAddress, billingAddress, email }} />
        <ReviewShippingPayment {...{ deliveryDetails, paymentInfo }} />
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
});

export default ReviewDisplay;
