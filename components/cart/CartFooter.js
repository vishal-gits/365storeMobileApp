import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useStoreContext } from "../../globalstore/Store";
import { useNavigation } from "@react-navigation/native";

const CartFooter = () => {
  const { state } = useStoreContext();
  const navigation = useNavigation();
  const cart = state.cart;
  // console.log(cart.total);
  return (
    <View>
      <View style={styles.checkoutBtn}>
        {/* A button to add more Items*/}
        <Pressable
          onPress={() =>
            navigation.navigate("Store", {
              screen: "StoreScreen",
              params: {
                cartId: cart.id,
              },
            })
          }
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            [
              styles.pressable,
              { width: "50%", alignSelf: "flex-start", marginTop: 10 },
            ],
          ]}
        >
          <Text style={[styles.checkoutText, { fontSize: 16 }]}>
            + Add More Items
          </Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Text style={styles.cartTotalText}>Items</Text>

        {/* Showing Cart Total */}
        <Text
          style={[
            styles.cartTotalText,
            {
              color: "#4C4C4C",
            },
          ]}
        >
          {/* Dividing the total by 100 because Medusa doesn't store numbers in decimal */}
          ${cart?.total / 100}
        </Text>
      </View>
      <View style={styles.row}>
        {/* Showing the discount (if any) */}
        <Text style={styles.cartTotalText}>Discount</Text>
        <Text
          style={[
            styles.cartTotalText,
            {
              color: "#4C4C4C",
            },
          ]}
        >
          - ${cart?.discount_total / 100}
        </Text>
      </View>
      <View style={[styles.row, styles.total]}>
        <Text style={styles.cartTotalText}>Total</Text>
        <Text
          style={[
            styles.cartTotalText,
            {
              color: "#4C4C4C",
            },
          ]}
        >
          {/* Calculating the total */}$
          {cart?.total / 100 - cart?.discount_total / 100}
        </Text>
      </View>
      <View style={styles.checkoutBtn}>
        {/* A button to navigate to checkout screen */}
        <Pressable
          onPress={() =>
            navigation.navigate("Checkout-Shipping", {
              cartId: cart.id,
            })
          }
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            styles.pressable,
          ]}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
    marginTop: 10,
  },
  total: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: "#E5E5E5",
    marginBottom: 10,
  },
  cartTotalText: {
    fontSize: wp("4.5%"),
    color: "#989899",
  },
  checkoutBtn: {
    BorderBottomWidth: 2,
    borderColor: "black",
    paddingBottom: 40,
  },
  pressable: {
    backgroundColor: "#2196f3",
    width: "100%",
    alignSelf: "center",
    borderRadius: 30,
  },
  checkoutText: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: 8,
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default CartFooter;
