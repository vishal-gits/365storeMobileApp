import { View, Text, StyleSheet } from "react-native";
import { logoutCustomer } from "../../utils/CustomerFunctions";
import Button from "../../components/Button";
import { useCustomerContext } from "../../globalstore/Customer";

const ProfileScreen = ({ navigation }) => {
  const { deleteCustomer } = useCustomerContext();

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
