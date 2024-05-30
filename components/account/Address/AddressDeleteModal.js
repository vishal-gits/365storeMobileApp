import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../../Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { deleteShippingAddress } from "../../../utils/CustomerEditFunctions";
import { useCustomerContext } from "../../../globalstore/Customer";
import LoadingModal from "../../../utils/LoadingModal";

const AddressDeleteModal = ({ setIsModalVisible, shippingAddress }) => {
  const { updateCustomer } = useCustomerContext();
  const addressId = shippingAddress.id;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (addressId) => {
    setIsDeleting(true);
    // console.log(addressId);
    const updatedCustomer = await deleteShippingAddress(addressId);
    // console.log(updatedCustomer);
    await updateCustomer(updatedCustomer);
    setIsDeleting(false);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isDeleting ? (
          <LoadingModal isLoading={isDeleting} />
        ) : (
          <>
            <Text style={styles.header}>Delete this Address</Text>
            <View style={styles.address}>
              <Text style={styles.text}>
                {`${shippingAddress.first_name} ${shippingAddress.last_name}`}
              </Text>
              <Text
                style={styles.text}
              >{`${shippingAddress.address_1} ${shippingAddress.address_2}`}</Text>
              <Text style={styles.text}>
                {shippingAddress.city + " " + shippingAddress.postal_code}
              </Text>
              {shippingAddress.state && <Text>{shippingAddress.state}</Text>}
              {shippingAddress.phone && (
                <Text style={styles.text}>Phone:{shippingAddress.phone}</Text>
              )}
            </View>
            <View style={styles.btn}>
              <Button
                small={true}
                title="Yes"
                onPress={() => {
                  handleDelete(addressId);
                }}
              />
              <Button
                small={true}
                title="No"
                onPress={() => {
                  setIsModalVisible(false);
                }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: wp("100%"),
    height: wp("80%"),
    backgroundColor: "white",
    // alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "#000080",
    borderWidth: 5,
    // padding: 20,
    flex: 1,
  },
  text: {
    // fontStyle: "italic",
    // color: "#808080",
    fontWeight: "bold",
    fontSize: 20,
  },
  address: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 80,
    textAlign: "center",
  },
  btn: {
    marginVertical: 80,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default AddressDeleteModal;
