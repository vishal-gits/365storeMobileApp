import { StyleSheet, View, Pressable, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home/Header.js";
import Banner from "../components/home/Banner.js";
import { useStoreContext } from "../globalstore/Store.js";
import SearchBar from "../components/home/SearchBar.js";
import ProductListHome from "../components/productListing/ProductListHome.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const { state } = useStoreContext();
  const [products, setProducts] = useState(state.products);

  return (
    <View style={styles.container}>
      <Header title="365 Store" />
      <Banner />
      <SearchBar setProducts={setProducts} products={products} />
      <ProductListHome products={products} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
});
