import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "./screens/Product";
import Home from "./screens/Home";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import baseURL from "./constants/url";
import axios from "axios";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        function fetchProducts() {
          axios
            .get(`${baseURL}/store/products`)
            .then((res) => {
              setProducts(res.data.products);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        fetchProducts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
        // console.log(products);
      }
    }
    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
