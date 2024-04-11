import { View, Text, Image, StyleSheet } from "react-native";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function ProductCardHome({ product, productLength }) {
  return (
    <View
      style={[
        styles.container,
        {
          width: productLength === 1 ? wp("70%") : wp("40%"),
          height: productLength === 1 ? wp("100%") : wp("60%"),
        },
      ]}
      key={product.id}
    >
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={[
          styles.image,
          { height: productLength === 1 ? hp("40%") : hp("20%") },
        ]}
      />

      <Text style={styles.category}>{product.handle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: hp("2%"),
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "#e6af2e",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
  },
  image: {
    borderRadius: 7,
    marginBottom: hp("2%"),
    objectFit: "contain",
  },
  category: {
    fontSize: wp("3.4%"),
    color: "#828282",
    marginTop: 3,
  },
});

export default memo(ProductCardHome);
