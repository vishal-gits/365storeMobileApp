import { View, TextInput } from "react-native";
import { filter } from "lodash";
import React, { useState } from "react";

const SearchBar = ({ setProducts, fullData }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (product) => {
      return contains(product, formattedQuery);
    });
    setProducts(filteredData);
    setQuery(text);
  };

  const contains = (product, query) => {
    const { title, description } = product;

    if (title.includes(query) || description.includes(query)) {
      return true;
    }

    return false;
  };

  return (
    <View
      style={{
        backgroundColor: "#000080",
        padding: 5,
        marginVertical: 10,
        borderRadius: 30,
        width: "80%",
      }}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        value={query}
        onChangeText={(queryText) => handleSearch(queryText)}
        placeholder="Search"
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          paddingVertical: 10,

          borderRadius: 30,
          fontSize: 20,
        }}
      />
    </View>
  );
};
export default SearchBar;
