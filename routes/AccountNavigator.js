import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/Account/AccountScreen";

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
