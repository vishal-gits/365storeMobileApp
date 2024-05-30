import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  ValidateAll,
  nameValidationSchema,
} from "../../../utils/validationSchema";
import Button from "../../../components/Button";
import { updateName } from "../../../utils/CustomerEditFunctions";
import { useCustomerContext } from "../../../globalstore/Customer";
import LoadingModal from "../../../utils/LoadingModal";

const EditName = ({ firstName, lastName, setIsEditing }) => {
  const { updateCustomer } = useCustomerContext();
  const [name, setName] = useState({ firstName, lastName });
  const [startedEditing, setStartedEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);

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
      await ValidateAll(nameValidationSchema, name, setErrors, dataIsValid);

      if (!dataIsValid.current) {
        alert("Please provide the details");
      } else {
        setIsUpdatingCustomer(true);
        const updatedCustomer = await updateName(name.firstName, name.lastName);
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
      <Text style={styles.header}>Edit your name</Text>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        onChangeText={(e) => {
          setName({ ...name, firstName: e });
        }}
        style={styles.input}
        value={name.firstName}
      />
      {errors.firstName && (
        <Text style={{ color: "red" }}>{errors.firstName}</Text>
      )}
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        onChangeText={(e) => {
          setName({ ...name, lastName: e });
        }}
        style={styles.input}
        value={name.lastName}
      />
      {errors.firstName && (
        <Text style={{ color: "red" }}>{errors.lastName}</Text>
      )}
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

export default EditName;
