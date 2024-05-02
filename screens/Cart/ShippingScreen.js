// Importing a few package and components
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import Button from "../../components/Button";
import AddShippingDetailsFunction from "../../utils/AddShippingDetailsFunction";
import { useStoreContext } from "../../globalstore/Store";
import AddressForm from "../../components/cart/AddressForm";
import LoadingModal from "../../utils/LoadingModal";

const ShippingScreen = ({ route, navigation }) => {
  const { cartId } = route.params;

  const { state, updateCart } = useStoreContext();

  // const iA = state.cart.shipping_address;
  // const iE = state.cart.email;
  // Passing onChange as a prop
  // console.log(iA, iE, "---from ShippingScreen");

  // Declaring a few states to store the user's input
  // const [firstName, setFirstName] = useState(iA?.first_name ?? "");
  // const [lastName, setLastName] = useState(iA?.last_name ?? "");
  // const [AddressLine1, setAddressLine1] = useState(iA?.address_1 ?? "");
  // const [AddressLine2, setAddressLine2] = useState(iA?.address_2 ?? "");
  // const [city, setCity] = useState(iA?.city ?? "");
  // const [countryCode, setCountryCode] = useState(iA?.country_code ?? "");
  // const [province, setProvince] = useState(iA?.state ?? "");
  // const [postalCode, setPostalCode] = useState(iA?.postal_code ?? "");
  // const [phone, setPhone] = useState(iA?.phone ?? "");
  // const [company, setCompany] = useState(iA?.company ?? "");
  // const [email, setEmail] = useState(iE ?? "");
  // const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  // const [keyboardVisible, setKeyboardVisible] = useState(false);
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
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleShippingData = async () => {
    console.log("i am pressed");
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
      setIsUpdatingCart(true);
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
      console.log(address);
      console.log(email, "----email before post ");
      const ShippingDetailsCart = await AddShippingDetailsFunction(
        cartId,
        address,
        email
      );
      console.log(
        ShippingDetailsCart,
        "---- shippindDetailsCart from handleShippingData"
      );
      await updateCart(ShippingDetailsCart);
      setIsUpdatingCart(false);
      navigation.navigate("Checkout-Billing", {
        shippingAddress: ShippingDetailsCart.shipping_address,
        cartId,
      });
    }
  };
  return (
    // Creating a view to hold the user's input

    <View style={styles.container}>
      {isUpdatingCart && <LoadingModal isLoading={isUpdatingCart} />}
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
            setCountryCode,
            setPostalCode,
            setProvince,
            setPhone,
            setCompany,
            firstName,
            lastName,
            AddressLine1,
            AddressLine2,
            city,
            countryCode,
            province,
            postalCode,
            phone,
            company,
          }}
        />
        <TextInput
          onChangeText={(e) => {
            setEmail(e);
          }}
          placeholder="*Email"
          style={styles.input}
          value={email}
        />
      </ScrollView>

      {!keyboardVisible && (
        <Button
          title="Continue to Billing Details"
          large="large"
          onPress={handleShippingData}
        />
      )}
    </View>
  );
};

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
  container: {
    // margin: hp("2%"),
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    borderWidth: 5,
    margin: 5,
    borderColor: "#e6af2e",
    borderRadius: 30,
    flex: 1,
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
});

export default ShippingScreen;
