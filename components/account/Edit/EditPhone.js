import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  ValidateAll,
  phoneValidationSchema,
} from "../../../utils/validationSchema";
import Button from "../../../components/Button";
import { updatePhone } from "../../../utils/CustomerEditFunctions";
import { useCustomerContext } from "../../../globalstore/Customer";
import LoadingModal from "../../../utils/LoadingModal";

const EditPhone = ({ phone: initialPhone, setIsEditing }) => {
  const { updateCustomer } = useCustomerContext();
  const [phone, setPhone] = useState(initialPhone);
  const [startedEditing, setStartedEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);

  // console.log(initialPhone, "--initialPhone from Edit Phone");
  // console.log(phone, "---from EditPhone start");
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
      const data = { phone: phone };
      await ValidateAll(phoneValidationSchema, data, setErrors, dataIsValid);

      if (!dataIsValid.current) {
        alert("Please provide the details");
      } else {
        setIsUpdatingCustomer(true);
        const updatedCustomer = await updatePhone(phone);
        // console.log(updatedCustomer, "---updatedCustomer from handleSubmit");
        await updateCustomer(updatedCustomer);
        setIsUpdatingCustomer(false);
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <View>
      {isUpdatingCustomer && <LoadingModal isLoading={isUpdatingCustomer} />}
      <Text style={styles.header}>Edit your phone</Text>
      <Text style={styles.label}>Phone</Text>
      <TextInput
        onChangeText={(e) => {
          setPhone(e);
        }}
        style={styles.input}
        value={phone}
      />
      {errors.phone && <Text style={{ color: "red" }}>{errors.phone}</Text>}
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
  header: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
  },
  label: {
    marginTop: 10,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 2,
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

export default EditPhone;
