import { StyleSheet, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Header from "../components/Header";
import Banner from "../components/Banner";
import baseURL from "../constants/url";
import { useWindowDimensions } from "react-native";

import SearchBar from "../components/SearchBar";

export default function Home({ navigation: { navigate }, route }) {
  console.log("from route", route.params.products);
  const { products, setProducts } = route.params;
  // console.log("from Home", products);
  // const [products, setProducts] = useState([]);
  const [fullData, setFullData] = useState(products);

  console.log(products);

  // function fetchProducts() {
  //   axios
  //     .get(`${baseURL}/store/products`)
  //     .then((res) => {
  //       // console.log(res.data.products);
  //       setProducts(res.data.products);
  //       setFullData(res.data.products);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <View style={styles.container}>
      <Header title="365 Store" />
      <Banner />
      <SearchBar setProducts={setProducts} fullData={fullData} />

      <FlatList
        style={styles.list}
        data={products}
        renderItem={({ item }) => {
          return (
            <Pressable
              key={item.id}
              onPress={() => {
                console.log(item.id);
                navigate("Product", {
                  productId: item.id,
                });
              }}
            >
              <ProductCard product={item} />
            </Pressable>
          );
        }}
        keyExtractor={(product) => product.id}
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
