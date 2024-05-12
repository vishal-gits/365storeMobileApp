import { View, Text, StyleSheet, Modal } from "react-native";
import { logoutCustomer } from "../../utils/CustomerFunctions";
import Button from "../../components/Button";
import { useCustomerContext } from "../../globalstore/Customer";
import { capitalize } from "lodash";
import { Feather } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const { customer, deleteCustomer } = useCustomerContext();
  console.log(
    customer?.first_name,
    customer?.email,
    customer?.phone,
    customer?.billing_address,
    customer?.password
  );
  const fullName = `${capitalize(customer?.first_name)} ${capitalize(
    customer?.last_name
  )}`;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile Details</Text>
      <Text>View and update your profile details</Text>

      <View style={styles.row}>
        <Text>Name: {fullName}</Text>
      </View>

      <View style={styles.row}>
        <Text>Email: {customer?.email}</Text>
      </View>
      <View style={styles.row}>
        <Text>Phone: {customer?.phone} </Text>
      </View>
      <View style={styles.row}>
        <Text>Password: Hidden </Text>
      </View>
      <View style={styles.row}>
        <Text>
          Billing Address: {customer?.billing_address || "No billing address"}
        </Text>
      </View>

      <Button
        title="Logout"
        small="true"
        onPress={async () => {
          await logoutCustomer();
          deleteCustomer();

          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

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
  row: {
    flexDirection: "row",
    // justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});

const Edit = () => {
  return (
    <Pressable onPress={() => setIsModalVisible(true)}>
      <Feather name="edit" size={24} color="#000080" />
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <CartEdit item={item} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </Pressable>
  );
};

export default ProfileScreen;
