import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import DeletePressable from "./DeletePressable";

const DetailAddress = ({ shippingAddress }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.detailsCol}>
      <View>
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
      <View style={styles.cross}>
        <DeletePressable
          {...{ setIsModalVisible, isModalVisible, shippingAddress }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cross: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  detailsCol: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    // fontStyle: "italic",
    color: "#808080",
    fontWeight: "bold",
  },
});

export default DetailAddress;
