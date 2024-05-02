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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../components/Button";
import AddBillingDetailsFunction from "../../utils/AddBillingDetailsFunction";
import { useStoreContext } from "../../globalstore/Store";
import { Checkbox } from "react-native-paper";
import AddressForm from "../../components/cart/AddressForm";
import LoadingModal from "../../utils/LoadingModal";

import { equalAddr } from "../../utils/addressEqualCheck";

const BillingScreen = ({ route, navigation }) => {
  const { cartId, shippingAddress } = route.params;

  const { state, updateCart } = useStoreContext();
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);

  let address;

  // const iA = state.cart?.billing_address; // iA=initialAddress
  // console.log({ ...iA }, "---iA from billing address");

  // const checkBoxState = () => {
  //   if (iA && Object.keys(iA).length > 0) {
  //     const equalAddress = equalAddr(shippingAddress, { ...iA });
  //     if (equalAddress) {
  //       console.log(equalAddress);
  //       return true;
  //     } else return false;
  //   } else return true;
  // };

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

  const [checked, setChecked] = useState(true);
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

  const handleBillingData = async () => {
    setIsUpdatingCart(true);
    if (checked) {
      address = {
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
      if (
        !firstName ||
        !lastName ||
        !AddressLine1 ||
        !countryCode ||
        !postalCode ||
        !city
      ) {
        alert("Please fill all the fields marked with *");
      } else {
        // Creating an object to store the user's input
        address = {
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
        // console.log(address, "---set billingAddress unchecked ");
      }
    }

    const BillingDetailsCart = await AddBillingDetailsFunction(cartId, address);
    // console.log(
    //   BillingDetailsCart.billing_address,
    //   "---- BillingDetailsCart.billing_address from handleBillingData"
    // );
    await updateCart(BillingDetailsCart);
    setIsUpdatingCart(false);
    navigation.navigate("Checkout-Delivery", { cartId: cartId });
  };
  return (
    // Creating a view to hold the user's input

    <View style={styles.container}>
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
                setFirstName,
                firstName,
                setLastName,
                lastName,
                setAddressLine1,
                AddressLine1,
                setAddressLine2,
                AddressLine2,
                setCity,
                city,
                countryCode,
                setCountryCode,
                setPostalCode,
                postalCode,
                setProvince,
                province,
                setPhone,
                phone,
                setCompany,
                company,
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
