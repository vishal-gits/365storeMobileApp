import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../Button";
import CheckCart from "../../utils/CheckCart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStoreContext } from "../../globalstore/Store";
import { useNavigation } from "@react-navigation/native";
import AddVariantToCart from "../../utils/AddVariantToCart";
import { ActivityIndicator } from "react-native";
import LoadingModal from "../../utils/LoadingModal";
import baseURL from "../../constants/url";

export default function MetaInfo({ product, isAddingCart, setIsAddingCart }) {
  const [activeSize, setActiveSize] = useState(0);
  const initialVariant = product.options[0].values[0].variant_id;
  // console.log(initialVariant, "initial Variant from metainfo");
  const [activeVariantId, setActiveVariantId] = useState(initialVariant);
  const { updateCart } = useStoreContext();
  const navigation = useNavigation();
  // const [isAddingCart, setIsAddingCart] = useState(false);
  //   console.log(product.options[0].values);
  // console.log(product.variants[1].prices[1].amount);
  // console.log(product.options[0]);

  const AddToCart = async () => {
    if (isAddingCart) {
      return;
    }

    setIsAddingCart(true);
    // console.log("clicked add to cart");
    const cartId = await CheckCart();

    // const cartId = await AsyncStorage.getItem("cart_id");

    // console.log(cartId, "this is from Addtocart");
    const CartAndVariantDetails = await AddVariantToCart(
      cartId,
      activeVariantId
    );
    // console.log(
    //   CartAndVariantDetails,
    //   " from AddToCart, just after AddVariantToCart function"
    // );
    await updateCart(CartAndVariantDetails);
    setIsAddingCart(false);
    navigation.navigate("Cart", { screen: "CartItems" });
  };

  return (
    <View style={styles.container}>
      {isAddingCart && <LoadingModal isLoading={isAddingCart} />}
      <View style={styles.row}>
        <Text style={styles.title}>{product.title}</Text>
        <View>
          <Text style={styles.price}>
            ${product.variants[0].prices[1].amount / 100}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>⭐⭐⭐</Text>
            <Button
              title="Add to Cart"
              onPress={AddToCart}
              medium={true}
              textSize={15}
              disabled={isAddingCart}
              // isLoading={isAddingCart}
            />
          </View>
        </View>
      </View>
      <Text style={styles.heading}>Available Sizes</Text>
      <View style={styles.row}>
        {product.options[0].values.map((size, index) => (
          <Text
            key={index}
            onPress={() => {
              setActiveSize(index);
              setActiveVariantId(() => {
                return size.variant_id;
              });
            }}
            style={[
              styles.sizeTag,
              {
                borderWidth: activeSize === index ? 3 : 0,
              },
            ]}
          >
            {size.value}
          </Text>
        ))}
      </View>
      <Text style={styles.heading}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button
        title="Add to Cart"
        onPress={AddToCart}
        large={true}
        textSize={20}
        disabled={isAddingCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("-5%"),
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // height: hp("100%"),
    padding: hp("5%"),

    paddingBottom: hp("10%"),
  },
  title: {
    fontSize: hp("3%"),
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    flexWrap: "wrap",
  },
  price: {
    fontSize: hp("4%"),
    fontWeight: "bold",
    color: "#C37AFF",
  },
  ratingContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  heading: {
    fontSize: hp("4%"),
    marginTop: hp("3%"),
  },
  star: {
    fontSize: hp("3%"),
    marginTop: hp("1%"),
  },
  sizeTag: {
    borderColor: "#C37AFF",
    backgroundColor: "#F7F6FE",
    color: "#000",
    paddingHorizontal: hp("3%"),
    paddingVertical: hp("2%"),
    borderRadius: hp("2%"),
    marginTop: hp("2%"),
    overflow: "hidden",
    fontSize: hp("3%"),
    marginBottom: hp("2%"),
  },
  description: {
    fontSize: hp("3%"),
    color: "gray",
    marginTop: hp("2%"),
    // marginBottom: hp("10%"),
  },
});
