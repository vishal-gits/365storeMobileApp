import { View, Text, StyleSheet, Image } from "react-native";
import { useStoreContext } from "../../../globalstore/Store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CartScreen = () => {
  const { state } = useStoreContext();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Cart Items</Text>
      {state?.cart?.items?.map((item) => (
        <View style={styles.innerContainer} key={item.id}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <View style={styles.info}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.priceBlock}>
                <Text style={styles.description}>
                  {item.description} • ${item.unit_price / 100}
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.price}>${item.total / 100}</Text>
              <Text style={styles.quantity}>Quantity : {item.quantity}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // marginVertical: 5,
    borderTopWidth: 2,
    borderColor: "#a5a5a5",
  },
  innerContainer: {
    marginTop: 5,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#e6e6e6",
    width: wp("90%"),
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 2,
  },
  image: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: 10,
    objectFit: "contain",
  },

  title: {
    fontSize: wp("3.5%"),
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
    // marginVertical: hp("2%"),
    width: wp("60%"),
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
export default CartScreen;
