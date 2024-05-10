// Importing a few package and components
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, memo, useRef } from "react";
import Button from "../../components/Button";
import AddBillingDetailsFunction from "../../utils/AddBillingDetailsFunction";
import { useStoreContext } from "../../globalstore/Store";
import { Checkbox } from "react-native-paper";
import AddressForm from "../../components/cart/AddressForm";
import LoadingModal from "../../utils/LoadingModal";
import {
  ValidateAll,
  billingValidationSchema,
} from "../../utils/validationSchema";

const BillingScreen = ({ route, navigation }) => {
  const { cartId, shippingAddress } = route.params;
  const { state, updateCart } = useStoreContext();
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  let finalAddress;
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
  });

  const [countryCode, setCountryCode] = useState("");
  const [countryError, setCountryError] = useState("");

  const [checked, setChecked] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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

  const handleBillingData = async () => {
    if (checked) {
      finalAddress = {
        first_name: shippingAddress.first_name,
        last_name: shippingAddress.last_name,
        address_1: shippingAddress.address_1,
        address_2: shippingAddress.address_2,
        city: shippingAddress.city,
        province: shippingAddress.province,
        postal_code: shippingAddress.postal_code,
        phone: shippingAddress.phone,
        company: shippingAddress.company,
        country_code: shippingAddress.country_code,
      };
      // console.log(address, "--- checked Billing Address= shippingAddress");
    } else {
      await ValidateAll(billingValidationSchema, addr, setErrors, dataIsValid);
      if (!countryCode) {
        setCountryError(() => true);
      } else {
        setCountryError(() => false);
      }

      if (!dataIsValid.current || countryCode === "") {
        console.log(
          dataIsValid.current,
          "----",
          countryCode,
          "---before alert"
        );
        alert("Please provide the details");
        return;
      } else {
        // Creating an object to store the user's input
        finalAddress = {
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
        console.log(finalAddress, "---before UpdatingCart ");
      }
    }
    console.log("going for updation");
    setIsUpdatingCart(true);
    const BillingDetailsCart = await AddBillingDetailsFunction(
      cartId,
      finalAddress
    );
    console.log(
      BillingDetailsCart.billing_address,
      "---- BillingDetailsCart.billing_address from handleBillingData"
    );
    await updateCart(BillingDetailsCart);
    setIsUpdatingCart(false);
    navigation.navigate("Checkout-Delivery", { cartId: cartId });
  };
  return (
    // Creating a view to hold the user's input

    <View
      style={[styles.container, { marginBottom: keyboardVisible ? 10 : 70 }]}
    >
      {isUpdatingCart && <LoadingModal isLoading={isUpdatingCart} />}

      <ScrollView>
        <Text style={styles.headerText}>Billing Details</Text>
        <View style={styles.checkboxView}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          <Text style={{ color: checked ? "black" : "#a5a5a5" }}>
            Billing address same as shipping address
          </Text>
        </View>

        {!checked && (
          <View>
            <Text>Please fill the billing details below</Text>

            <AddressForm
              {...{
                addr,
                setAddr,
                countryCode,
                setCountryCode,
                errors,
                countryError,
              }}
            />
          </View>
        )}
      </ScrollView>
      {!keyboardVisible && (
        <Button
          title="Continue to Delivery"
          large="large"
          onPress={handleBillingData}
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
    paddingTop: 10,
    paddingBottom: 20,
    borderWidth: 5,
    margin: 5,
    marginBottom: 70,
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
  checkboxView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default BillingScreen;
