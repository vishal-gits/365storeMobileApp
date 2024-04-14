import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreScreen from "../screens/StoreProduct/StoreScreen";
import ProductInfo from "../screens/StoreProduct/ProductInfoScreen";
import EmptyCart from "../screens/Cart/EmptyCartScreen";
import Cart from "../screens/Cart/CartScreen";
import CheckOut from "../screens/Cart/CheckOutScreen";
import PlaceOrder from "../screens/Cart/PlaceOrderScreen";
import Payment from "../screens/Cart/PaymentScreen";
import FinalOrder from "../screens/Cart/FinalOrderScreen";

import { useStoreContext } from "../globalstore/Store";

const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  const { state } = useStoreContext();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartItems"
        component={Object.keys(state.cart).length === 0 ? EmptyCart : Cart}
      />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
      <Stack.Screen name="OrderPayment" component={Payment} />
      <Stack.Screen name="FinalOrder" component={FinalOrder} />
    </Stack.Navigator>
  );
};
export default CartNavigator;
