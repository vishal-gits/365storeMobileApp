import { StyleSheet, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/home/Header";
import Banner from "../components/home/Banner";
import { useStoreContext } from "../globalstore/Store";
import SearchBar from "../components/home/SearchBar";
import EmptyCard from "../components/EmptyCard";

export default function Home({ navigation: { navigate } }) {
  const { state } = useStoreContext();
  const [products, setProducts] = useState(state.products);

  // const [clicked, setClicked] = useState(false);

  // console.log(state.products, "This is full data");

  return (
    <View style={styles.container}>
      <Header title="365 Store" />
      <Banner />
      <SearchBar setProducts={setProducts} products={products} />

      <FlatList
        style={styles.list}
        data={products}
        renderItem={({ item }) => {
          return (
            <Pressable
              key={item.id}
              onPress={() => {
                // console.log(item.id);
                navigate("Product", {
                  productId: item.id,
                });
              }}
            >
              <ProductCard product={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
      />
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
  list: {
    backgroundColor: "#e6af2e",
    padding: 20,
    borderRadius: 10,
  },
});
