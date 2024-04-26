import baseURL from "../constants/url";
import { Badge } from "react-native-paper";
import { View } from "react-native";

export const initializePaymentSessions = async (cartId, setPaymentSessions) => {
  await fetch(`${baseURL}/store/carts/${cartId}/payment-sessions`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then(({ cart }) => {
      // console.log(
      //   cart.payment_sessions,
      //   " ---- from initializePaymentSessions"
      // );
      setPaymentSessions(cart.payment_sessions);
    });
};

export const setPaymentProvider = async (cartId, paymentProviderId) => {
  // console.log(cartId, paymentProviderId, "---- from setPaymentProvider start");

  const cart = await fetch(`${baseURL}/store/carts/${cartId}/payment-session`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      provider_id: paymentProviderId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({ cart }) => {
      // console.log(
      //   cart.payment_session,
      //   "----from cart.payment_session setpayment functionEnd"
      // );
      return cart;
    });
  return cart;
};

export const PaymentTest = () => {
  return (
    <View>
      <Badge
        style={{
          backgroundColor: "red",
          paddingHorizontal: 5,
          marginTop: -15,
          marginBottom: 5,
        }}
      >
        Attention: For testing purposes only.
      </Badge>
    </View>
  );
};

const completeCart = (cartId) => {
  fetch(`${baseURL}/store/carts/${cartId}/complete`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({ type, data }) => {
      console.log(type, data);
    });
};

const placeOrder = () => {
  handlePayment();
};
