import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
import ProductInfo from "../screens/ProductInfoScreen";

const Stack = createNativeStackNavigator();

const HomeProductNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Home} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
    </Stack.Navigator>
  );
};
export default HomeProductNavigator;
