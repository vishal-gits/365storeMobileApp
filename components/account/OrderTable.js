import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import OrderModal from "../../components/account/OrderModal";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const OrderTable = ({ order }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.orderHeaderRow}>
      <Text style={[styles.rowText, { width: "20%" }]}>
        {order.display_id}
        {/* {console.log(order.id, "---orderIds")} */}
      </Text>
      <Text style={[styles.rowText, { width: "40%" }]}>
        {new Date(order.created_at).toDateString()}
      </Text>
      <Text style={[styles.rowText, { width: "25%" }]}>
        ${(order.total / 100).toFixed(2)}
      </Text>
      <Pressable
        style={[styles.rowText, { width: "20%", alignItems: "center" }]}
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="pluscircle" size={26} color="#000080" />
        <Modal
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <OrderModal {...{ setIsModalVisible, isModalVisible, order }} />
        </Modal>
      </Pressable>
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
export default OrderTable;
