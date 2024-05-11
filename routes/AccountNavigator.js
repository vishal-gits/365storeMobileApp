import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStoreContext } from "../globalstore/Store";
import AccountScreen from "../screens/Account/AccountScreen";
import OverviewScreen from "../screens/Account/OverviewScreen";
import ProfileScreen from "../screens/Account/ProfileScreen";
import OrderedScreen from "../screens/Account/OrderedScreen";
import AddressScreen from "../screens/Account/AddressScreen";
import CustomerNavigator from "./CustomerNavigator";
import { useCustomerContext } from "../globalstore/Customer";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  const { customer } = useCustomerContext();

  return (
    <Stack.Navigator>
      {!customer.id && <Stack.Screen name="Login" component={AccountScreen} />}
      {customer.id && (
        <Stack.Screen
          name="Customer"
          component={CustomerNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
export default AccountNavigator;
