import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StoreProductNavigator from "./StoreProductNavigator";
import CartNavigator from "./CartNavigator";
import Home from "../screens/HomeScreen";
import Account from "../screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import { useStoreContext } from "../globalstore/Store";

const screenOptionsStyle = {
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
};

function RootNavigator() {
  const { state } = useStoreContext();

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
          component={CartNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="shopping-cart" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
