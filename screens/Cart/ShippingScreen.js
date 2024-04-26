// Importing a few package and components
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../components/Button";
import AddShippingDetailsFunction from "../../utils/AddShippingDetailsFunction";
import { useStoreContext } from "../../globalstore/Store";
import { Checkbox } from "react-native-paper";
import AddressForm from "../../components/Cart/AddressForm";

export default function ShippingScreen({ route, navigation }) {
  const { cartId } = route.params;

  const { state, updateCart } = useStoreContext();

  // Passing onChange as a prop

  // Declaring a few states to store the user's input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [AddressLine1, setAddressLine1] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(true);

  const handleShippingData = async () => {
    if (
      !firstName ||
      !lastName ||
      !AddressLine1 ||
      !countryCode ||
      !postalCode ||
      !email ||
      !city
    ) {
      alert("Please fill all the fields marked with *");
    } else {
      // Creating an object to store the user's input
      let address = {
        first_name: firstName,
        last_name: lastName,
        address_1: AddressLine1,
        address_2: AddressLine2,
        city,
        province,
        postal_code: postalCode,
        phone,
        company,
        country_code: countryCode,
      };
      //   console.log(email, "----email before post ");
      const ShippingDetailsCart = await AddShippingDetailsFunction(
        cartId,
        address,
        email
      );
      //   console.log(
      //     ShippingDetailsCart,
      //     "---- shippindDetailsCart from handleShippingData"
      //   );
      await updateCart(ShippingDetailsCart);
      navigation.navigate("Checkout-Billing", {
        shippingAddress: ShippingDetailsCart.shipping_address,
        cartId,
      });
    }
  };
  return (
    // Creating a view to hold the user's input
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Shipping Details</Text>
        <Text>Please fill the shipping details below</Text>

        {/* Creating a text input for the user's first name */}

        <AddressForm
          {...{
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
          }}
        />

        <TextInput
          onChangeText={(e) => {
            setEmail(e);
          }}
          placeholder="*Email"
          style={styles.input}
        />
        {/* <View style={styles.checkboxView}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          <Text>Billing address same as shipping address</Text>
        </View> */}
        <Button
          title="Continue to Billing Details"
          large="large"
          onPress={handleShippingData}
        />
      </ScrollView>
    </View>
  );
}

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
  container: {
    // margin: hp("2%"),
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderWidth: 5,
    margin: 5,
    borderColor: "#e6af2e",
    borderRadius: 30,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    marginTop: 10.2,
  },
  //   checkboxView: {
  //     flexDirection: "row",
  //     justifyContent: "space-around",
  //     alignItems: "center",
  //     marginVertical: 10,
  //   },
});
