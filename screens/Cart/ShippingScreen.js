// Importing a few package and components
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, memo, useRef } from "react";
import Button from "../../components/Button";
import AddShippingDetailsFunction from "../../utils/AddShippingDetailsFunction";
import { useStoreContext } from "../../globalstore/Store";
import AddressForm from "../../components/cart/AddressForm";
import LoadingModal from "../../utils/LoadingModal";
import * as yup from "yup";
import {
  ValidateAll,
  shippingValidationSchema,
} from "../../utils/validationSchema";

const ShippingScreen = ({ route, navigation }) => {
  const { cartId } = route.params;
  // console.log("p1");
  const { state, updateCart } = useStoreContext();
  const [addr, setAddr] = useState({
    firstName: "",
    lastName: "",
    AddressLine1: "",
    AddressLine2: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    company: "",
    email: "",
  });

  const [countryCode, setCountryCode] = useState("");
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [countryError, setCountryError] = useState("");
  const [errors, setErrors] = useState({});

  const dataIsValid = useRef(false);
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
    await ValidateAll(shippingValidationSchema, addr, setErrors, dataIsValid);
    if (!countryCode) {
      setCountryError(() => true);
    } else {
      setCountryError(() => false);
    }

    if (!dataIsValid.current || countryCode === "") {
      alert("Please provide the details");
    } else {
      setIsUpdatingCart(true);
      // Creating an object to store the user's input
      let address = {
        first_name: addr.firstName,
        last_name: addr.lastName,
        address_1: addr.AddressLine1,
        address_2: addr.AddressLine2,
        city: addr.city,
        province: addr.province,
        postal_code: addr.postalCode,
        phone: addr.phone,
        company: addr.company,
        country_code: countryCode,
      };

      const ShippingDetailsCart = await AddShippingDetailsFunction(
        cartId,
        address,
        addr.email
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
        <AddressForm
          {...{
            addr,
            setAddr,
            countryCode,
            setCountryCode,
            errors,
            countryError,
          }}
          emailBlock={true}
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
