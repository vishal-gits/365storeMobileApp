import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OverviewScreen from "../screens/Account/OverviewScreen";
import ProfileScreen from "../screens/Account/ProfileScreen";
import AddressScreen from "../screens/Account/AddressScreen";

const Drawer = createDrawerNavigator();

const CustomerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Overview" component={OverviewScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Addresses" component={AddressScreen} />
    </Drawer.Navigator>
  );
};
export default CustomerNavigator;
