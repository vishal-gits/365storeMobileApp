import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropdownComponent = ({
  data,
  value,
  setValue,
  placeholder,
  bgColor,
  textColor,
  itemTextColor,
  showValue,
}) => {
  return (
    <Dropdown
      mode="modal"
      style={[
        styles.dropdown,
        { backgroundColor: bgColor || "#24a0ed", color: textColor || "white" },
      ]}
      placeholderStyle={[styles.placeholderStyle, { color: textColor || null }]}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemContainerStyle={[
        styles.itemContainerStyle,
        { backgroundColor: bgColor || "#24a0ed" },
      ]}
      iconStyle={styles.iconStyle}
      itemTextStyle={{
        color: itemTextColor || textColor || "white",
        textAlign: "center",
      }}
      data={data}
      search={false}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Search..."
      value={showValue ? value : placeholder}
      onChange={(item) => {
        setValue(item.value);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 8,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: "90%",
    backgroundColor: "#24a0ed",
    paddingVertical: 5,
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
    color: "white",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
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
  itemContainerStyle: {
    backgroundColor: "#24a0ed",
  },
});
