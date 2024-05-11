import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useCustomerContext } from "../../globalstore/Customer";
import { capitalize } from "lodash";
import { getProfileCompletion } from "../../utils/CustomerFunctions";
import { useEffect, useState } from "react";
import { getOrders } from "../../utils/CustomerFunctions";
import { AntDesign } from "@expo/vector-icons";

const OverviewScreen = () => {
  const { customer } = useCustomerContext();
  const [orders, setOrders] = useState("");
  console.log(customer, customer?.id, "--- from Overview Screen");

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await getOrders();
      console.log(allOrders, "---allOrders from useEffect");
      setOrders(allOrders);
    };
    getAllOrders();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>
          Welcome {capitalize(customer.first_name)}
        </Text>
        <Text style={styles.emailHeader}>Signed in as {customer.email}</Text>
      </View>
      <View style={styles.profileRow}>
        <Text style={styles.profileText}>
          Profile : {getProfileCompletion(customer)}% Completed
        </Text>
        <Text style={styles.profileText}>
          Addresses: {customer?.shipping_addresses?.length || 0} saved
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        overScrollMode="auto"
      >
        <Text style={styles.orderHeader}>Recent Orders</Text>
        {orders && orders.length > 0 ? (
          <View>
            <View style={styles.orderHeaderRow}>
              <Text style={[styles.rowHeaderText, { width: "20%" }]}>
                Order No.
              </Text>
              <Text style={[styles.rowHeaderText, { width: "40%" }]}>Date</Text>
              <Text style={[styles.rowHeaderText, { width: "25%" }]}>
                Amount
              </Text>
              <Text style={[styles.rowHeaderText, { width: "20%" }]}>
                Details
              </Text>
            </View>

            {orders.map((order) => {
              return (
                <View key={order.id} style={styles.orderHeaderRow}>
                  <Text style={[styles.rowText, { width: "20%" }]}>
                    {order.display_id}
                    {console.log(order.shipping_methods, "---shipping_methods")}
                  </Text>
                  <Text style={[styles.rowText, { width: "40%" }]}>
                    {new Date(order.created_at).toDateString()}
                  </Text>
                  <Text style={[styles.rowText, { width: "25%" }]}>
                    ${(order.total / 100).toFixed(2)}
                  </Text>

                  <Pressable
                    style={[
                      styles.rowText,
                      { width: "20%", alignItems: "center" },
                    ]}
                  >
                    <AntDesign name="pluscircle" size={26} color="#000080" />
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>You do not have any recent Orders</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",

    borderWidth: 5,

    borderColor: "#e6af2e",
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  emailHeader: {
    textAlign: "right",
    fontSize: 16,
    marginBottom: 10,
    fontStyle: "italic",
  },
  orderTable: {
    // flex: 1,
    paddingBottom: 10,
  },
  profileRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 10,
    backgroundColor: "#f5f5f5",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  profileText: {
    fontSize: 16,
  },
  orderHeader: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 20,
  },
  orderHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  rowHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 5,
    textAlign: "center",
  },
  rowText: {
    fontSize: 16,
    paddingHorizontal: 5,
    textAlign: "center",
  },
});

export default OverviewScreen;
