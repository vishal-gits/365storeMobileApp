import { Checkbox } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { useState, useRef } from "react";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStoreContext } from "../../globalstore/Store";
import { useOrderContext } from "../../globalstore/Order";
import baseURL from "../../constants/url";
import LoadingModal from "../../utils/LoadingModal";

const OrderScreen = ({ navigation }) => {
  const { state, updateCart } = useStoreContext();
  const { updateOrder } = useOrderContext();
  const [checked, setChecked] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();

  const provider_id = state.cart.payment_session.provider_id;
  // console.log(provider_id, "----from OrderScreen");
  const cartId = state.cart.id;

  const deliveryDetails = {
    shippingOptionName:
      state.cart?.shipping_methods[0]?.shipping_option.name ?? "",
    shippingOptionAmount:
      state.cart?.shipping_methods[0]?.shipping_option.amount ?? "",
  };

  const completeCart = async (cartId) => {
    console.log(cartId);
    await fetch(`${baseURL}/store/carts/${cartId}/complete`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async ({ type, data }) => {
        console.log(type, data);
        if (type === "order") {
          // Update your local state with the order data
          console.log(type);
          await updateOrder({ ...data, ...deliveryDetails });
          console.log("before AsyncStorage");
          await AsyncStorage.removeItem("cart_id");
          console.log("afterAsyncStorage");
          setIsOrdering(false);
          navigation.navigate("Order-Confirmed");
        } else if (type === "cart") {
          // Handle the error and update your local state with the cart data
          console.log(type);
          await updateCart(data);
          setIsOrdering(false);
          alert("There is an error, order cannot be completed");
        }
        // console.log("before AsyncStorage");
        // AsyncStorage.removeItem("cart_id");
        // console.log("afterAsyncStorage");
      });
  };

  const handlePlaceOrder = async () => {
    setIsOrdering(true);
    console.log("i am pressed");
    if (provider_id === "stripe") {
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
      await completeCart(cartId);
    } else if (provider_id === "manual") {
      await completeCart(cartId);
    }
    // setIsOrdering(false);
    // navigation.navigate("Order-Confirmed");
  };

  return (
    <View style={styles.container}>
      {isOrdering && <LoadingModal isLoading={isOrdering} />}
      <View style={styles.innerContainer}>
        <View style={styles.checkBoxView}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text>
            By clicking the Place Order button, you confirm that you have read,
            understand and accept our Terms of Use, Terms of Sale and Returns
            Policy
          </Text>
        </View>
        <Button
          title="Place Order"
          large="true"
          onPress={handlePlaceOrder}
          disabled={!checked}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderWidth: 5,
    margin: 15,
    borderColor: "#e6af2e",
    borderRadius: 30,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  checkBoxView: {
    flexDirection: "row",
    width: "80%",
  },
});

export default OrderScreen;
