import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useStoreContext } from "../../globalstore/Store";
import EmptyCart from "../../components/EmptyCart";

import CartItem from "../../components/Cart/CartItem";
import CartFooter from "../../components/Cart/CartFooter";

const CartScreen = () => {
  const { state } = useStoreContext();
  // console.log(state.cart.items, "------from Cart Screen.js");
  // console.log(state.cart.region, "----cart.region from cart screen");
  // console.log(Object.keys(state?.cart).length, "i am rendered cart screen");
  // const items = state.cart.items;
  // console.log(items, "----items from Cart Screen");
  return (
    <View style={styles.container}>
      {Object.keys(state.cart).length !== 0 ? (
        <ScrollView>
          {state?.cart?.items?.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
          <CartFooter />
        </ScrollView>
      ) : (
        <EmptyCart />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginVertical: 5,
  },
});
export default CartScreen;
