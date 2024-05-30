import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  ValidateAll,
  emailValidationSchema,
} from "../../../utils/validationSchema";
import Button from "../../../components/Button";
import { updateEmail } from "../../../utils/CustomerEditFunctions";
import { useCustomerContext } from "../../../globalstore/Customer";
import LoadingModal from "../../../utils/LoadingModal";

const EditEmail = ({ email: initialEmail, setIsEditing }) => {
  const { updateCustomer } = useCustomerContext();
  const [email, setEmail] = useState(initialEmail);
  const [startedEditing, setStartedEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);

  // console.log(initialEmail, "--initialEmail from Edit Email");
  // console.log(email, "---from EditEmail start");
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
      const data = { email: email };
      await ValidateAll(emailValidationSchema, data, setErrors, dataIsValid);

      if (!dataIsValid.current) {
        alert("Please provide the details");
      } else {
        setIsUpdatingCustomer(true);
        const updatedCustomer = await updateEmail(email);
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
      <Text style={styles.header}>Edit your email</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        onChangeText={(e) => {
          setEmail(e);
        }}
        style={styles.input}
        value={email}
      />
      {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
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

export default EditEmail;
