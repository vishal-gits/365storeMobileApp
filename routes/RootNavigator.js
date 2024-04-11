import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StoreProductNavigator from "./StoreProductNavigator";
import Home from "../screens/HomeScreen";
import Cart from "../screens/CartScreen";
import Account from "../screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000080",
            borderBottomWidth: 4,

            borderTopWidth: 4,
            borderWidth: 4,
            borderColor: "#000080",
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "#000080",
          tabBarInactiveTintColor: "#e6af2e",
          tabBarActiveBackgroundColor: "white",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Store"
          component={StoreProductNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="store-search"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />
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
