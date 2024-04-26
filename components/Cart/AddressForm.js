// Importing a few package and components
import { View, StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../Button";

import CountrySelect from "./CountrySelect";

export default function AddressForm({
  setFirstName,
  setLastName,
  setAddressLine1,
  setAddressLine2,
  setCity,
  countryCode,
  setCountryCode,
  setPostalCode,
  setProvince,
  setPhone,
  setCompany,
}) {
  return (
    // Creating a view to hold the user's input

    <View>
      <TextInput
        onChangeText={(e) => {
          // Setting the user's input to the firstName state
          setFirstName(e);

          // Calling the handleChange function
        }}
        placeholder="*First Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setLastName(e);
        }}
        placeholder="*Last Name"
        style={styles.input}
      />

      <TextInput
        onChangeText={(e) => {
          setAddressLine1(e);
        }}
        placeholder="*Address Line 1"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setAddressLine2(e);
        }}
        placeholder="Address Line 2"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setCity(e);
        }}
        placeholder="*City"
        style={styles.input}
      />
      <CountrySelect
        countryCode={countryCode}
        setCountryCode={setCountryCode}
      />

      <TextInput
        onChangeText={(e) => {
          setPostalCode(e);
        }}
        placeholder="*Postal Code"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setProvince(e);
        }}
        placeholder="Province"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setPhone(e);
        }}
        placeholder="Phone"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setCompany(e);
        }}
        placeholder="Company"
        style={styles.input}
      />
    </View>
  );
}

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
  //   container: {
  //     margin: hp("2%"),
  //     backgroundColor: "#fff",
  //   },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    marginTop: 10.2,
  },
  checkboxView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
});
