import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useStoreContext } from "../../globalstore/Store";
import CartItem from "../../components/Cart/CartItem";

const CartScreen = () => {
  const { state } = useStoreContext();
  // console.log(state.cart.items, "------from Cart Screen.js");

  const items = state.cart.items;
  console.log(items, "----items from Cart Screen");
  return (
    <View style={styles.container}>
      <ScrollView>
        {state?.cart?.items?.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
export default CartScreen;
