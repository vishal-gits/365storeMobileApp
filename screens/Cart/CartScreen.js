import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useStoreContext } from "../../globalstore/Store";
import EmptyCart from "../../components/EmptyCart";

import CartItem from "../../components/cart/CartItem";
import CartFooter from "../../components/cart/CartFooter";

const CartScreen = () => {
  const { state } = useStoreContext();
  console.log(state.cart.display_id, "---orderId from Cart Screen");
  return (
    <View style={styles.container}>
      {!state.cart.display_id && Object.keys(state.cart).length !== 0 ? (
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
