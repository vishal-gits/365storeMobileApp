import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeProductNavigator from "./HomeProductNavigator";
import Store from "../screens/StoreScreen";
import Cart from "../screens/CartScreen";
import Account from "../screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeProductNavigator} />
        <Tab.Screen name="Store" component={Store} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ProductInfoScreen from "../screens/ProductInfoScreen";
// import HomeScreen from "../screens/HomeScreen";

// const Stack = createNativeStackNavigator();

// const RootNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="ProductInfo" component={ProductInfoScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default RootNavigator;
