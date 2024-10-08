import { View, Text, Image, StyleSheet } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../Button";
import { memo } from "react";

function ProductCardStore({ product }) {
  return (
    <View style={styles.container} key={product.id}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>{product.handle}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ${product.variants[0].prices[1].amount / 100}
        </Text>

        <Button title="BUY" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    borderRadius: 10,
    marginBottom: hp("4%"),
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    padding: 10,
    width: wp("70%"),
    backgroundColor: "#fff",
  },
  image: {
    height: hp("40%"),
    borderRadius: 7,
    marginBottom: hp("2%"),
    objectFit: "contain",
  },
  title: {
    fontSize: wp("3.7%"),
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("3%"),
  },
  category: {
    fontSize: wp("3.4%"),
    color: "#828282",
    marginTop: 3,
  },
  price: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
});

export default memo(ProductCardStore);
