import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useCustomerContext } from "../../globalstore/Customer";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import AddEditShippingAddress from "../../components/account/Edit/AddEditShippingAddress";
import EditPressable from "../../components/account/Address/EditPressable";
import DeletePressable from "../../components/account/Address/DeletePressable";
import DetailAddress from "../../components/account/Address/DetailAddress";

const AddressScreen = () => {
  const { customer } = useCustomerContext();
  const shippingAddresses = customer.shipping_addresses;
  const [isAddEditing, setIsAddEditing] = useState(false);
  const [addressForEdit, setAddressForEdit] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressForDelete, setAddressForDelete] = useState({});

  return (
    <View style={styles.container}>
      {!isAddEditing ? (
        <>
          <Text style={styles.headerText}>Shipping Addresses</Text>
          <Text>
            View and update your shipping addresses, you can add as many as you
            like. Saving your addresses will make them available during
            checkout.
          </Text>

          <Text style={styles.listHeader}>List of Shipping Address</Text>
          <ScrollView>
            {shippingAddresses.length > 0 ? (
              <>
                {shippingAddresses.map((shippingAddress, index) => {
                  return (
                    <View style={styles.addressCol} key={shippingAddress?.id}>
                      {shippingAddress ? (
                        <View style={styles.shippingCol}>
                          <View style={styles.editHeader}>
                            <Text>Shipping Address {index + 1}: </Text>
                            <EditPressable
                              {...{
                                shippingAddress,
                                setIsAddEditing,
                                setAddressForEdit,
                              }}
                            />
                          </View>
                          <DetailAddress {...{ shippingAddress }} />
                        </View>
                      ) : (
                        <>
                          <Text>Shipping Address: </Text>
                          <Text>No shipping address</Text>
                        </>
                      )}
                    </View>
                  );
                })}
              </>
            ) : (
              <View style={styles.shippingCol}>
                <Text>No Shipping Address</Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.btn}>
            <Button
              large={true}
              title="Add New Shipping Address"
              onPress={() => {
                setIsAddEditing(true);
              }}
            />
          </View>
        </>
      ) : (
        <AddEditShippingAddress
          {...{ setIsAddEditing, setAddressForEdit }}
          shippingAddress={addressForEdit}
        />
      )}
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
    marginHorizontal: 10,
    marginVertical: 20,

    borderColor: "#e6af2e",
    borderRadius: 30,
    flex: 1,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  editHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    marginVertical: 10,
  },
  addressCol: {
    flexDirection: "column",
  },
  shippingCol: {
    flexDirection: "column",
    marginVertical: 15,
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  text: {
    // fontStyle: "italic",
    color: "#808080",
    fontWeight: "bold",
  },
  listHeader: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default AddressScreen;
