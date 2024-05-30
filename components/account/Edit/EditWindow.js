import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import EditName from "./EditName";
import EditEmail from "./EditEmail";
import EditPhone from "./EditPhone";
import EditPassword from "./EditPassword";
import EditBillingAddress from "./EditBillingAddress";

const EditWindow = ({
  setIsEditing,
  editParam,
  firstName,
  lastName,
  email,
  phone,
  billingAddress,
}) => {
  // console.log(editParam);
  return (
    <View style={styles.container}>
      {editParam === "Name" && (
        <EditName {...{ firstName, lastName, setIsEditing }} />
      )}
      {editParam === "email" && <EditEmail {...{ email, setIsEditing }} />}
      {editParam === "phone" && <EditPhone {...{ phone, setIsEditing }} />}
      {editParam === "password" && <EditPassword {...{ setIsEditing }} />}
      {editParam === "BillingAddress" && (
        <EditBillingAddress {...{ billingAddress, setIsEditing }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: 10,
  },

  headerText: {
    textAlign: "center",
    fontSize: 24,
  },
  closeBtn: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default EditWindow;
