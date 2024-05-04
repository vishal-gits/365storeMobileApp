import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import baseURL from "../constants/url";
import axios from "axios";
import { useStoreContext } from "../globalstore/Store";
import RootNavigator from "../routes/RootNavigator";
import { View, Text } from "react-native";
import CheckCart from "../utils/CheckCart";

SplashScreen.preventAutoHideAsync();

export default function SplashLoader() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { state, getProducts, updateCart } = useStoreContext();

  useEffect(() => {
    async function prepare() {
      try {
        const results = await axios
          .get(`${baseURL}/store/products`)
          .then((res) => {
            return res.data.products;
          });
        // console.log(results, "These are the results");
        getProducts(results);
        const cartId = await CheckCart();
        if (cartId) {
          await fetch(`${baseURL}/store/carts/${cartId}`, {
            credentials: "include",
          })
            .then((response) => response.json())
            .then(({ cart }) => updateCart(cart));
        }
        console.log(cartId);
        console.log(state.cart, "--- this is state.cart from splash loader");
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
    // console.log(state.products, "After Prepare");
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    // <View
    //   onLayout={onLayoutRootView}
    //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    // >
    //   <Text>Yes I am there</Text>
    // </View>

    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <RootNavigator />
    </View>
  );
}
