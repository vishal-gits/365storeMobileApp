import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useCustomerContext } from "../../globalstore/Customer";
import { capitalize } from "lodash";
import { getProfileCompletion } from "../../utils/CustomerFunctions";
import { useEffect, useState } from "react";
import { getOrders } from "../../utils/CustomerFunctions";
import OrderTable from "../../components/account/OrderTable";

const OverviewScreen = () => {
  const { customer } = useCustomerContext();
  const [orders, setOrders] = useState("");

  // console.log(customer, customer?.id, "--- from Overview Screen");

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await getOrders();
      // console.log(allOrders, "---allOrders from useEffect");
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
              return <OrderTable key={order.id} order={order} />;
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
});

export default OverviewScreen;
