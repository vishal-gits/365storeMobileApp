import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { logoutCustomer } from "../../utils/CustomerFunctions";
import baseURL from "../../constants/url";
import { useState, useEffect } from "react";
import { useCustomerContext } from "../../globalstore/Customer";
import { capitalize } from "lodash";
import Button from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import EditWindow from "../../components/account/Edit/EditWindow";

const ProfileScreen = ({ navigation }) => {
  const { customer, deleteCustomer, updateCustomer } = useCustomerContext();

  useEffect(() => {
    checkCustomer = async () => {
      const updatedCustomer = await fetch(`${baseURL}/store/customers/me`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customer.email,
        }),
      })
        .then((response) => response.json())
        .then(({ customer }) => {
          console.log(customer);
          console.log(customer.id);
          return customer;
        });

      updateCustomer(updatedCustomer);
    };

    checkCustomer();
  }, []);

  console.log(
    customer,
    customer?.billing_address,
    "---------customer and biling details from profile screen"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editParam, setEditParam] = useState("");

  const firstName = customer?.first_name;

  const lastName = customer?.last_name;

  const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`;

  const email = customer?.email;

  const phone = customer?.phone;

  const billingAddress = customer?.billing_address;

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <Text style={styles.headerText}>Profile Details</Text>
          <Text>View and update your profile details</Text>
          <View style={styles.row}>
            <Text>Name: {fullName}</Text>
            <EditPressable
              {...{ setEditParam, setIsEditing }}
              thisParam="Name"
            />
          </View>
          <View style={styles.row}>
            <Text>Email: {email}</Text>
            <EditPressable
              {...{ setEditParam, setIsEditing }}
              thisParam="email"
            />
          </View>
          <View style={styles.row}>
            <Text>Phone: {phone} </Text>
            <EditPressable
              {...{ setEditParam, setIsEditing }}
              thisParam="phone"
            />
          </View>
          <View style={styles.row}>
            <Text>Password: Hidden </Text>
            <EditPressable
              {...{ setEditParam, setIsEditing }}
              thisParam="password"
            />
          </View>
          <View style={styles.row}>
            <View style={styles.addressCol}>
              <Text>Billing Address: </Text>
              {billingAddress ? (
                <View style={styles.billingCol}>
                  <Text style={styles.text}>
                    {`${billingAddress.first_name} ${billingAddress.last_name}`}
                  </Text>
                  <Text
                    style={styles.text}
                  >{`${billingAddress.address_1} ${billingAddress.address_2}`}</Text>
                  <Text style={styles.text}>
                    {billingAddress.city + " " + billingAddress.postal_code}
                  </Text>
                  {billingAddress.state && <Text>{billingAddress.state}</Text>}
                  {billingAddress.phone && (
                    <Text style={styles.text}>
                      Phone:{billingAddress.phone}
                    </Text>
                  )}
                </View>
              ) : (
                <Text>No billing address</Text>
              )}
            </View>
            <EditPressable
              {...{ setEditParam, setIsEditing }}
              thisParam="BillingAddress"
            />
          </View>
          <View style={styles.logout}>
            <Button
              title="Logout"
              small="true"
              onPress={async () => {
                await logoutCustomer();
                deleteCustomer();
                console.log(customer, "----after deletion and logout");
                navigation.navigate("Login");
              }}
            />
          </View>
        </>
      ) : (
        <EditWindow
          {...{
            setIsEditing,
            editParam,
            firstName,
            lastName,
            email,
            phone,
            billingAddress,
          }}
        />
        // <View>
        //   <Button
        //     title="close"
        //     small={true}
        //     onPress={() => setIsEditing(false)}
        //   />
        // </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  addressCol: {
    flexDirection: "column",
  },
  billingCol: {
    flexDirection: "column",
  },
  logout: {
    alignItems: "center",
  },
});

const EditPressable = ({ setIsEditing, setEditParam, thisParam }) => {
  return (
    <>
      <Pressable
        onPress={() => {
          setIsEditing(true);
          setEditParam(thisParam);
        }}
      >
        <Feather name="edit" size={24} color="#000080" />
      </Pressable>
    </>
  );
};

export default ProfileScreen;
