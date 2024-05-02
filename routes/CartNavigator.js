import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";

import Cart from "../screens/Cart/CartScreen";

import Review from "../screens/Cart/ReviewScreen";
import Payment from "../screens/Cart/PaymentScreen";
import Order from "../screens/Cart/OrderScreen";
import Shipping from "../screens/Cart/ShippingScreen";
import Billing from "../screens/Cart/BillingScreen";
import Delivery from "../screens/Cart/DeliveryScreen";
import ConfirmedOrder from "../screens/Cart/ConfirmedOrderScreen";

const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <StripeProvider publishableKey="pk_test_51OuOY2SBJdegiVis8WwyzfMK2SKquZjx5h1uqIn1fQrROdQ2jCTLKBggCfsMnT9bRPMBOiZDoPGr91T75TzSTy0E00g7raTIeB">
      <Stack.Navigator>
        <Stack.Screen name="CartItems" component={Cart} />
        <Stack.Screen name="Checkout-Shipping" component={Shipping} />
        <Stack.Screen name="Checkout-Billing" component={Billing} />
        <Stack.Screen name="Checkout-Delivery" component={Delivery} />
        <Stack.Screen name="Checkout-Payment" component={Payment} />
        <Stack.Screen name="Checkout-Review" component={Review} />
        <Stack.Screen name="Checkout-Order" component={Order} />
        <Stack.Screen name="Order-Confirmed" component={ConfirmedOrder} />
      </Stack.Navigator>
    </StripeProvider>
  );
};
export default CartNavigator;
