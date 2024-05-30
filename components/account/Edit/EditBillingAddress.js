import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import Button from "../../../components/Button";
import { useState, useEffect, useRef } from "react";
import CountrySelect from "../../../components/cart/CountrySelect";
import LoadingModal from "../../../utils/LoadingModal";
import {
  billingAddressValidationSchema,
  ValidateAll,
} from "../../../utils/validationSchema";
import { updateBillingAddress } from "../../../utils/CustomerEditFunctions";
import { useCustomerContext } from "../../../globalstore/Customer";
import AddressForm from "../../cart/AddressForm";

const EditBillingAddress = ({ billingAddress, setIsEditing }) => {
  // console.log(billingAddress);
  const { updateCustomer, customer } = useCustomerContext();
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);
  // console.log(customer.billing_address, "----");
  const [addr, setAddr] = useState({
    firstName: billingAddress?.first_name || "",
    lastName: billingAddress?.last_name || "",
    AddressLine1: billingAddress?.address_1 || "",
    AddressLine2: billingAddress?.address_2 || "",
    city: billingAddress?.city || "",
    province: billingAddress?.province || "",
    postalCode: billingAddress?.postal_code || "",
    company: billingAddress?.company || "",
  });
  const [countryCode, setCountryCode] = useState(
    billingAddress?.country_code || ""
  );
  const [countryError, setCountryError] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [startedEditing, setStartedEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const dataIsValid = useRef(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setStartedEditing(true);
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

  const handleSubmit = async () => {
    if (startedEditing) {
      const data = { ...addr };
      await ValidateAll(
        billingAddressValidationSchema,
        data,
        setErrors,
        dataIsValid
      );
      if (!countryCode) {
        setCountryError(() => true);
      } else {
        setCountryError(() => false);
      }

      if (!dataIsValid.current || countryCode === "") {
        alert("Please provide the details");
        return;
      } else {
        // console.log(dataIsValid, "----after validation");
        finalAddress = {
          first_name: addr.firstName,
          last_name: addr.lastName,
          address_1: addr.AddressLine1,
          address_2: addr.AddressLine2,
          city: addr.city,
          province: addr.province,
          postal_code: addr.postalCode,
          company: addr.company,
          country_code: countryCode,
        };
        setIsUpdatingCustomer(true);
        const updatedCustomer = await updateBillingAddress(finalAddress);
        console.log(updatedCustomer, "---updatedCustomer from handleSubmit");
        await updateCustomer(updatedCustomer);
        console.log(
          customer,
          "---After updated customer after billing address"
        );

        setIsUpdatingCustomer(false);
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      {isUpdatingCustomer && <LoadingModal isLoading={isUpdatingCustomer} />}
      {!keyboardVisible && (
        <Text style={styles.header}>Edit Billing Address</Text>
      )}
      <ScrollView
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        overScrollMode="auto"
      >
        <AddressForm
          {...{
            addr,
            setAddr,
            countryCode,
            setCountryCode,
            errors,
            countryError,
          }}
          noPhone={true}
        />
      </ScrollView>
      {!keyboardVisible && (
        <View style={styles.closeBtn}>
          <Button
            title={startedEditing ? "Save & Close" : "Close"}
            small={!startedEditing && true}
            medium={startedEditing}
            onPress={() => handleSubmit()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  header: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    marginTop: 10.2,
  },
  closeBtn: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default EditBillingAddress;
