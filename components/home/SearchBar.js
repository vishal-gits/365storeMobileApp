import { View, TextInput, Keyboard, StyleSheet } from "react-native";
import { filter } from "lodash";
import React, { useState, useRef } from "react";
import { useStoreContext } from "../../globalstore/Store";
import { Entypo } from "@expo/vector-icons";

const SearchBar = ({ setProducts, products }) => {
  const { state } = useStoreContext();
  const textBox = useRef();
  const [query, setQuery] = useState("");
  const [clicked, setClicked] = useState(false);
  // const query = state.query;
  // console.log(query, "From Search Bar");
  const fullData = products;

  const handleSearch = (text) => {
    const textArr = text.split(" ");
    // console.log(textArr, textArr.length);

    // console.log(fullData.length, products.length);
    const formattedQuery =
      textArr.length === 1
        ? textArr[0].toLowerCase()
        : textArr[textArr.length - 1].toLowerCase();
    const filteredData = filter(fullData, (product) => {
      return contains(product, formattedQuery);
    });
    setProducts(filteredData);
    setQuery(text);
  };

  const contains = (product, query) => {
    const { title, description, handle } = product;
    // console.log(title);
    if (
      title.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query) ||
      handle.toLowerCase().includes(query)
    ) {
      return true;
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={textBox}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        value={query}
        onChangeText={(queryText) => handleSearch(queryText)}
        placeholder="Search"
        placeholderTextColor={"gray"}
        // onSubmitEditing={() => {
        //   console.log("submit editing");
        // }}
        // onEndEditing={() => {
        //   console.log("end editing");
        //   console.log(state.products.length, fullData.length, products.length);
        //   // setFullData(state.products);
        //   // setClicked(false);
        // }}
        onFocus={() => {
          setClicked(true);
          textBox.current.clear();
          setProducts(state.products);
        }}
        style={[styles.textInput, { width: clicked ? "90%" : "100%" }]}
      />
      {clicked && (
        <Entypo
          name="cross"
          size={25}
          color="white"
          style={{ padding: 2 }}
          onPress={() => {
            setClicked(false);
            Keyboard.dismiss();
            setQuery("");
            setProducts(state.products);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000080",
    padding: 5,
    marginVertical: 10,
    borderRadius: 30,
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 8,

    borderRadius: 30,
    fontSize: 18,
  },
});

export default SearchBar;
