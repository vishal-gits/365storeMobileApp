import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState, useEffect } from "react";
import DropdownComponent from "../DropdownComponent";
import { useStoreContext } from "../../globalstore/Store";
import {
  qtyArr,
  CartEditCheckFunction,
  RemoveCart,
  UpdateCartInfo,
} from "../../utils/CartEditFunctions";
import LoadingModal from "../../utils/LoadingModal";

const CartEdit = ({ item, setIsModalVisible }) => {
  const { state, updateCart } = useStoreContext();

  const [currentQuantity, setCurrentQuantity] = useState(item.quantity);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);
  const cartId = state.cart.id;
  const lineItemId = item.id;
  // console.log(lineItemId, "----lineItemId from CartEdit");
  // console.log(item, "---item from cartEdit ");

  const quantityArr = qtyArr();

  const quantityEdit = CartEditCheckFunction(currentQuantity, item.quantity);

  const handleClose = async () => {
    setIsUpdatingCart(true);
    if (currentQuantity === 0) {
      console.log("i am zero");
      const cartWithRemovedItem = await RemoveCart(cartId, lineItemId);
      // console.log(cartWithRemovedItem, "--- from handleClose");
      await updateCart(cartWithRemovedItem);
    } else {
      if (quantityEdit) {
        const cartWithUpdatedItem = await UpdateCartInfo(
          cartId,
          lineItemId,
          currentQuantity
        );
        // console.log(cartWithUpdatedItem, "--- from handleClose");
        await updateCart(cartWithUpdatedItem);
      }
    }
    setIsUpdatingCart(false);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      {isUpdatingCart && <LoadingModal isLoading={isUpdatingCart} />}

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Edit Cart Item</Text>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.text}>Selected Variant: {item.description}</Text>

          <Text style={styles.text}>Price: ${item.unit_price / 100}</Text>

          <Text
            style={[
              styles.text,
              {
                backgroundColor: quantityEdit ? "#e6af2e" : "white",
              },
            ]}
          >
            {quantityEdit ? "Changed Order Quantity" : "Order Quatity"} :{" "}
            {currentQuantity}
          </Text>
          <DropdownComponent
            value={currentQuantity}
            setValue={setCurrentQuantity}
            data={quantityArr}
            placeholder="Edit the Order Quantity"
          />
          {currentQuantity === 0 && (
            <Text style={styles.warning}>
              You have selected 0 quantity, this item will be deleted from your
              cart. Save & Close
            </Text>
          )}
          <View style={styles.button}>
            <Button
              title={quantityEdit ? "Save & Close" : "Close"}
              color={quantityEdit ? "red" : "#2196f3"}
              onPress={handleClose}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: "5",
  },
  container: {
    marginTop: 20,
    // flexDirection: "column",
    // alignItems: "center",
    // borderBottomWidth: 1,
    // paddingBottom: 10,
    // borderColor: "#e6e6e6",
    width: wp("90%"),
    borderWidth: 5,
    borderColor: "#000080",
    flex: 1,
    alignItems: "center",
    borderRadius: 20,
  },
  heading: {
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: 10,
    borderColor: "#e6af2e",
    borderWidth: 5,
    objectFit: "contain",
  },

  title: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },

  info: {
    // marginLeft: wp("3%"),
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: hp("2%"),
    width: wp("70%"),
  },
  text: {
    fontSize: 16,
    // backgroundColor: "#e6af2e",
    marginVertical: 5,
    borderRadius: 10,
    padding: 5,
  },
  button: {
    width: "60%",
    alignSelf: "center",
    marginTop: 30,
  },
  warning: {
    backgroundColor: "black",
    color: "yellow",
    fontSize: 20,
    padding: 3,
  },
});

export default CartEdit;
