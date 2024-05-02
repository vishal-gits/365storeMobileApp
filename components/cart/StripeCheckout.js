import React from "react";
import { View, Button } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import baseURL from "../../constants/url";

function StripeCheckout({ billingAddress }) {
  const fetchPaymentIntentClientSecret = async () => {
    const apiEndpoint = baseURL;

    const response = await fetch(`${apiEndpoint}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails = billingAddress;
    // console.log(billingDetails, "---billingDetails from handlePayPress");
    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      type: "card",
      billingDetails,
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      console.log("Success from promise", paymentIntent);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}

export default StripeCheckout;
