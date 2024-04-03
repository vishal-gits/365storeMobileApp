import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MetaInfo({ product }) {
  //   console.log(product.options[0].values);
  const [activeSize, setActiveSize] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{product.title}</Text>
        <View>
          <Text style={styles.price}>
            ${product.variants[0].prices[1].amount / 100}
          </Text>
          <Text style={styles.star}>⭐⭐⭐</Text>
        </View>
      </View>
      <Text style={styles.heading}>Available Sizes</Text>
      <View style={styles.row}>
        {product.options[0].values.map((size, index) => (
          <Text
            key={index}
            onPress={() => {
              setActiveSize(index);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("-5%"),
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: hp("100%"),
    padding: hp("5%"),
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
    fontSize: hp("4%"),
    color: "#aaa",
    marginTop: hp("2%"),
  },
});
