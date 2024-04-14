import React from "react";
import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreScreen from "../screens/StoreProduct/StoreScreen";
import ProductInfo from "../screens/StoreProduct/ProductInfoScreen";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const StoreProductNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StoreScreen" component={StoreScreen} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
    </Stack.Navigator>
  );
};
export default StoreProductNavigator;
