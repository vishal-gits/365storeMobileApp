import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Pressable,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  ValidateAll,
  passwordValidationSchema,
  ValidatePassword,
  authenticatePassword,
  equalPasswords,
} from "../../../utils/validationSchema";
import Button from "../../../components/Button";
import { updatePassword } from "../../../utils/CustomerEditFunctions";
import { useCustomerContext } from "../../../globalstore/Customer";
import LoadingModal from "../../../utils/LoadingModal";

import PasswordInput from "../../../components/PasswordInput";

const EditPassword = ({ setIsEditing }) => {
  const { updateCustomer, customer } = useCustomerContext();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [startedEditing, setStartedEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);

  const dataIsValid = useRef(false);

  const email = customer?.email;

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
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      // console.log(errors, "errors before validateAll");

      // await ValidateAll(passwordValidationSchema, data, setErrors, dataIsValid);

      await ValidatePassword(
        passwordValidationSchema,
        data,
        setErrors,
        dataIsValid,
        email
      );

      // console.log(dataIsValid.current, "---dataIsValid after ValidateAll");
      // console.log(errors, "errors after validateAll");

      // console.log(dataIsValid.current, "---final check");
      if (dataIsValid.current) {
        // console.log("all clear");
        setIsUpdatingCustomer(true);
        const updatedCustomer = await updatePassword(newPassword);
        // console.log(updatedCustomer, "---updatedCustomer from handleSubmit");
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
      <Text style={styles.header}>Edit your password</Text>
      <Text style={styles.label}>Old Password</Text>
      <PasswordInput setPassword={setOldPassword} password={oldPassword} />
      {errors?.oldPassword && (
        <Text style={{ color: "red" }}>{errors?.oldPassword}</Text>
      )}
      <Text style={styles.label}>New Password</Text>
      <PasswordInput setPassword={setNewPassword} password={newPassword} />
      {errors?.newPassword && (
        <Text style={{ color: "red" }}>{errors?.newPassword}</Text>
      )}
      <Text style={styles.label}>Confirm New Password</Text>
      <PasswordInput
        setPassword={setConfirmPassword}
        password={confirmPassword}
      />
      {errors?.confirmPassword && (
        <Text style={{ color: "red" }}>{errors?.confirmPassword}</Text>
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
    marginVertical: 10,
    paddingLeft: 10,
  },

  closeBtn: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default EditPassword;
