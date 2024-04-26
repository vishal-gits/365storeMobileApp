import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart/CartScreen";

import PlaceOrder from "../screens/Cart/PlaceOrderScreen";
import Payment from "../screens/Cart/PaymentScreen";
import FinalOrder from "../screens/Cart/FinalOrderScreen";
import Shipping from "../screens/Cart/ShippingScreen";
import Billing from "../screens/Cart/BillingScreen";
import Delivery from "../screens/Cart/DeliveryScreen";

const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartItems" component={Cart} />
      <Stack.Screen name="Checkout-Shipping" component={Shipping} />
      <Stack.Screen name="Checkout-Billing" component={Billing} />
      <Stack.Screen name="Checkout-Delivery" component={Delivery} />
      <Stack.Screen name="Checkout-Payment" component={Payment} />
      <Stack.Screen name="Checkout-PlaceOrder" component={PlaceOrder} />

      <Stack.Screen name="Checkout-FinalOrder" component={FinalOrder} />
    </Stack.Navigator>
  );
};
export default CartNavigator;
