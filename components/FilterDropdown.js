import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import sortProducts from "../utils/SortProducts";

const data = [
  { label: "Latest Arrivals", value: "created_at" },
  { label: "Price-Low to High", value: "price_asc" },
  { label: "Price-High to Low", value: "price_desc" },
];

const FilterDropdown = ({
  products,
  setProducts,
  filterValue: value,
  setFilterValue: setValue,
}) => {
  useEffect(() => {
    // console.log(value, "---from inside useEffect");
    const sortedProducts = sortProducts(products, value);
    setProducts(() => {
      return [...sortedProducts];
    });
    // console.log(sortedProducts[0].title, "--after setProducts");
  }, [value]);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={[styles.dropdown, { width: value ? "90%" : "100%" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      containerStyle={styles.containerStyle}
      itemContainerStyle={styles.itemContainerStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={false}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Filter Products"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
      renderItem={renderItem}
    />
  );
};

export default FilterDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
    borderColor: "#000080",
    borderWidth: 4,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    width: "80%",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  containerStyle: {
    borderWidth: 4,
    borderColor: "#e6af2e",
    borderRadius: 30,
    backgroundColor: "#f4f0ec",
  },
  itemContainerStyle: {
    fontStyle: "italic",
  },
});
