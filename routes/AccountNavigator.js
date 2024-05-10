import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStoreContext } from "../globalstore/Store";
import AccountScreen from "../screens/Account/AccountScreen";
import OverviewScreen from "../screens/Account/OverviewScreen";
import ProfileScreen from "../screens/Account/ProfileScreen";
import OrderedScreen from "../screens/Account/OrderedScreen";
import AddressScreen from "../screens/Account/AddressScreen";

const Drawer = createDrawerNavigator();

const AccountNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Overview" component={OverviewScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Orders" component={OrderedScreen} />
      <Drawer.Screen name="Addresses" component={AddressScreen} />
    </Drawer.Navigator>
  );
};
export default AccountNavigator;
