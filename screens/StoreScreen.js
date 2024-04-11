import { StyleSheet, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useStoreContext } from "../globalstore/Store.js";
import SearchBar from "../components/home/SearchBar.js";
import ProductListStore from "../components/productListing/ProductListStore.js";
import DropdownComponent from "../components/FilterDropdown.js";
import { Entypo } from "@expo/vector-icons";

export default function StoreScreen() {
  const { state } = useStoreContext();
  const [products, setProducts] = useState(state.products);
  const [filterValue, setFilterValue] = useState(null);
  // console.log(products[0].title, "----from StoreScreen component");
  return (
    <View style={styles.container}>
      <SearchBar setProducts={setProducts} products={products} />
      <View style={styles.dropdown}>
        <DropdownComponent
          setProducts={setProducts}
          products={products}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
        {filterValue && (
          <Entypo
            name="cross"
            size={25}
            color="white"
            style={{ padding: 2 }}
            onPress={() => {
              setFilterValue(null);
              setProducts(state.products);
            }}
          />
        )}
      </View>

      <ProductListStore products={products} />
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
  dropdown: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000080",
    flexDirection: "row",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 10,
  },
});
