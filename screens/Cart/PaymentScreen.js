import { View, Text, StyleSheet } from "react-native";
import baseURL from "../../constants/url";
import { useEffect, useState } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStoreContext } from "../../globalstore/Store";
import Button from "../../components/Button";

import PaymentRadioButton from "../../components/Cart/PaymentRadioButton";
import StripeCard from "../../components/Cart/StripeCard";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import {
  initializePaymentSessions,
  setPaymentProvider,
} from "../../utils/PaymentFunctions";

const PaymentScreen = ({ route }) => {
  const { cartId } = route.params;
  // console.log(cartId);

  const { confirmPayment, loading } = useConfirmPayment();
  const { state, updateCart } = useStoreContext();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [paymentSessions, setPaymentSessions] = useState(null);

  const [value, setValue] = useState("");

  useEffect(() => {
    initializePaymentSessions(cartId, setPaymentSessions);
  }, []);

  const handleValueChange = async (newValue) => {
    // console.log(newValue, "----from handleValueChange");
    const updatedCart = await setPaymentProvider(cartId, newValue);
    await updateCart(updatedCart);
    // console.log(state.cart, "---- state.cart from handleValueChange");
  };

  const handleReviewOrderSubmit = async (value) => {
    if (value === "stripe") {
      const clientSecret = state.cart.payment_session.data.client_secret;
      console.log(clientSecret, "--clientSecret from handlePayment");

      const billingDetails = {
        address: {
          city: state.cart.billing_address.city ?? undefined,
          country: state.cart.billing_address.country_code ?? undefined,
          line1: state.cart.billing_address.address_1 ?? undefined,
          line2: state.cart.billing_address.address_2 ?? undefined,
          postal_code: state.cart.billing_address.postal_code ?? undefined,
          state: state.cart.billing_address.province ?? undefined,
        },
        email: state.cart.email,
        name:
          state.cart.billing_address.first_name +
          " " +
          state.cart.billing_address.last_name,
        phone: state.cart.billing_address.phone ?? undefined,
      };
      console.log(billingDetails);

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails,
        },
      });
      if (error) {
        console.log("Payment confirmation error", error);
      } else if (paymentIntent) {
        console.log("Success from promise", paymentIntent);
      }
      // completeCart();
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51OuOY2SBJdegiVis8WwyzfMK2SKquZjx5h1uqIn1fQrROdQ2jCTLKBggCfsMnT9bRPMBOiZDoPGr91T75TzSTy0E00g7raTIeB">
      <View style={styles.container}>
        <Text style={styles.text}>PaymentScreen</Text>
        {paymentSessions && (
          <View style={styles.optionsContainer}>
            <PaymentRadioButton
              {...{ value, setValue, handleValueChange, paymentSessions }}
            />
            {value === "stripe" && <StripeCard {...{ setPaymentInfo }} />}
            {value && (
              <Button
                title="Continue to Review Order"
                onPress={() => handleReviewOrderSubmit(value)}
                large={true}
                textSize={24}
              />
            )}
          </View>
        )}
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: hp("2%"),
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderWidth: 5,
    margin: 15,
    borderColor: "#e6af2e",
    borderRadius: 30,
  },

  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default PaymentScreen;
