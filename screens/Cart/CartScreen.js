import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useStoreContext } from "../../globalstore/Store";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CartScreen = () => {
  const { state } = useStoreContext();
  console.log(state.cart.items, "------from Cart Screen.js");

  return (
    <View style={styles.container}>
      <ScrollView>
        {state?.cart?.items.map((product) => {
          console.log(product, "---inside scrollview");
          <Text>CartItem</Text>;
        })}
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
  // row: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   width: wp("90%"),
  //   marginTop: 10,
  // },
  // total: {
  //   borderTopWidth: 1,
  //   paddingTop: 10,
  //   borderTopColor: "#E5E5E5",
  //   marginBottom: 10,
  // },
  // cartTotalText: {
  //   fontSize: wp("4.5%"),
  //   color: "#989899",
  // },
});
export default CartScreen;
