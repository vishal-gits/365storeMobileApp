import baseURL from "../constants/url";
import { Badge } from "react-native-paper";
import { View } from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      if (type === "order") {
        // Update your local state with the order data
        setOrder(data);
      } else if (type === "cart") {
        // Handle the error and update your local state with the cart data
        setCart(data);
      }
      AsyncStorage.getItem("cart_id");
    });
};

// const placeOrder = () => {
//   handlePayment();
// };

const handlePlaceOrder = async (value) => {
  const { confirmPayment, loading } = useConfirmPayment();
  if (value === "stripe") {
    const clientSecret = state.cart.payment_session.data.client_secret;
    // console.log(clientSecret, "--clientSecret from handlePayment");

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
    // console.log(billingDetails);

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
    completeCart(cartId);
  }
};
