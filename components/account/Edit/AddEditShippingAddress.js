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
  shippingAddressValidationSchema,
  ValidateAll,
} from "../../../utils/validationSchema";
import {
  addShippingAddress,
  editShippingAddress,
} from "../../../utils/CustomerEditFunctions";
import { useCustomerContext } from "../../../globalstore/Customer";
import AddressForm from "../../cart/AddressForm";

const AddEditShippingAddress = ({
  shippingAddress,
  setIsAddEditing,
  setAddressForEdit,
}) => {
  console.log(shippingAddress, "---from top AddEditShippingAddress");
  const { updateCustomer, customer } = useCustomerContext();
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);

  const addressId = shippingAddress?.id;
  console.log(addressId, "----AddressId");
  const [addr, setAddr] = useState({
    firstName: shippingAddress?.first_name || "",
    lastName: shippingAddress?.last_name || "",
    AddressLine1: shippingAddress?.address_1 || "",
    AddressLine2: shippingAddress?.address_2 || "",
    city: shippingAddress?.city || "",
    province: shippingAddress?.province || "",
    postalCode: shippingAddress?.postal_code || "",
    phone: shippingAddress?.phone || "",
    company: shippingAddress?.company || "",
  });
  const [countryCode, setCountryCode] = useState(
    shippingAddress?.country_code || ""
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
        shippingAddressValidationSchema,
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
        console.log(dataIsValid, "----after validation");
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
        // console.log(finalAddress, "----final Address before updating customer");
        setIsUpdatingCustomer(true);
        let updatedCustomer;
        if (addressId) {
          updatedCustomer = await editShippingAddress(finalAddress, addressId);
          setAddressForEdit({});
        } else {
          updatedCustomer = await addShippingAddress(finalAddress);
        }
        console.log(updatedCustomer, "---updatedCustomer from handleSubmit");
        await updateCustomer(updatedCustomer);
        console.log(
          customer,
          "---After updated customer after shipping address"
        );

        setIsUpdatingCustomer(false);
        setIsAddEditing(false);
      }
    } else {
      setAddressForEdit({});
      setIsAddEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      {isUpdatingCustomer && <LoadingModal isLoading={isUpdatingCustomer} />}
      {!keyboardVisible && (
        <Text style={styles.header}>
          {shippingAddress ? "Edit " : "Add "}Shipping Address
        </Text>
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
    flex: 1,
    justifyContent: "space-around",
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

export default AddEditShippingAddress;
