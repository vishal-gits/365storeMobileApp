import { StyleSheet, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home/Header.js";
import Banner from "../components/home/Banner.js";
import { useStoreContext } from "../globalstore/Store.js";
import SearchBar from "../components/home/SearchBar.js";
import ProductList from "../components/products/ProductList.js";

export default function HomeScreen() {
  const { state } = useStoreContext();
  const [products, setProducts] = useState(state.products);

  return (
    <View style={styles.container}>
      <Header title="365 Store" />
      <Banner />
      <SearchBar setProducts={setProducts} products={products} />
      <ProductList products={products} />
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
});
