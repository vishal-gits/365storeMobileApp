// Importing a few package and components
import { View, StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
import CountrySelect from "./CountrySelect";

export default function AddressForm({
  addr,
  setAddr,
  countryCode,
  setCountryCode,
  errors,
  emailBlock,
  countryError,
}) {
  return (
    // Creating a view to hold the user's input

    <View>
      {emailBlock && (
        <>
          <TextInput
            onChangeText={(e) => {
              setAddr({ ...addr, email: e });
            }}
            placeholder="*Email"
            style={styles.input}
            value={addr.email}
          />
          {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
        </>
      )}
      <TextInput
        onChangeText={async (e) => {
          setAddr({ ...addr, firstName: e });
        }}
        placeholder="*First Name"
        style={styles.input}
        value={addr.firstName}
      />
      {errors.firstName && (
        <Text style={{ color: "red" }}>{errors.firstName}</Text>
      )}
      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, lastName: e });
        }}
        placeholder="*Last Name"
        style={styles.input}
        value={addr.lastName}
      />
      {errors.lastName && (
        <Text style={{ color: "red" }}>{errors.lastName}</Text>
      )}
      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, AddressLine1: e });
        }}
        placeholder="*Address Line 1"
        style={styles.input}
        value={addr.AddressLine1}
      />
      {errors.AddressLine1 && (
        <Text style={{ color: "red" }}>{errors.AddressLine1}</Text>
      )}
      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, AddressLine2: e });
        }}
        placeholder="Address Line 2"
        style={styles.input}
        value={addr.AddressLine2}
      />
      {errors.AddressLine2 && (
        <Text style={{ color: "red" }}>{errors.AddressLine2}</Text>
      )}
      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, city: e });
        }}
        placeholder="*City"
        style={styles.input}
        value={addr.city}
      />
      {errors.city && <Text style={{ color: "red" }}>{errors.city}</Text>}
      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, postalCode: e });
        }}
        placeholder="*Postal Code"
        style={styles.input}
        value={addr.postalCode}
      />
      {errors.postalCode && (
        <Text style={{ color: "red" }}>{errors.postalCode}</Text>
      )}
      <CountrySelect
        countryCode={countryCode}
        setCountryCode={setCountryCode}
      />
      {countryError && (
        <Text style={{ color: "red" }}>Please select country</Text>
      )}

      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, province: e });
        }}
        placeholder="Province"
        style={styles.input}
        value={addr.province}
      />
      {errors.province && (
        <Text style={{ color: "red" }}>{errors.province}</Text>
      )}
      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, phone: e });
        }}
        placeholder="Phone"
        style={styles.input}
        value={addr.phone}
      />
      {errors.phone && <Text style={{ color: "red" }}>{errors.phone}</Text>}
      <TextInput
        onChangeText={(e) => {
          setAddr({ ...addr, company: e });
        }}
        placeholder="Company"
        style={styles.input}
        value={addr.company}
      />
      {errors.company && <Text style={{ color: "red" }}>{errors.company}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
