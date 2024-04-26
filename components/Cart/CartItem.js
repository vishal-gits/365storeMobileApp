import { View, Text, StyleSheet, Image, Pressable, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CartEdit from "./CartEdit";

export default function CartItem({ item }) {
  // console.log(item.id, "---ItemIds from Cart Item");

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceBlock}>
            <Text style={styles.description}>
              {item.description} • ${item.unit_price / 100}
            </Text>
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
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${item.total / 100}</Text>
          <Text style={styles.quantity}>Quantity : {item.quantity}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#e6e6e6",
    width: wp("90%"),
  },
  image: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: 10,
    objectFit: "contain",
  },

  title: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  priceBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    marginLeft: wp("3%"),
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: hp("2%"),
    width: wp("50%"),
  },
  description: {
    fontSize: wp("3.5%"),
    color: "#8e8e93",
    marginTop: hp("2%"),
  },

  price: {
    fontSize: wp("4%"),
  },
  quantity: {
    fontSize: wp("4%"),
  },
});

// import { View, Text } from "react-native";
// const CartItem = ({ item }) => {
//   console.log(item?.id, "----from Cart Item");
//   return (
//     <View>
//       <Text>Cart Item</Text>
//     </View>
//   );
// };
// export default CartItem;
