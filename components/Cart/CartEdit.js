import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import DropdownComponent from "../DropdownComponent";
import { useStoreContext } from "../../globalstore/Store";

const CartEdit = ({ item, setIsModalVisible }) => {
  const { state } = useStoreContext();
  const [currentVariant, setCurrentVariant] = useState(item.description);
  const [currentQuantity, setCurrentQuantity] = useState(item.quantity);

  console.log(item.description);
  const currentProduct = state.products.filter(
    (product) => product.id === item.variant.product.id
  );

  const variantOptionValuesArr = currentProduct[0].options[0].values;

  const variantValueArr = []; // array of sizes of variants
  variantOptionValuesArr.map((variant) =>
    variantValueArr.push({ label: variant.value, value: variant.value })
  );

  const quantityArr = [];

  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) =>
    quantityArr.push({ label: num.toString(), value: num })
  );

  return (
    <View style={styles.centeredView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Edit Cart Details</Text>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>

          <Text
            style={[
              styles.text,
              {
                backgroundColor:
                  currentVariant !== item.description ? "#e6af2e" : "white",
              },
            ]}
          >
            {currentVariant !== item.description
              ? "Changed Variant"
              : "Selected Variant"}
            : {currentVariant}
          </Text>
          {variantOptionValuesArr.length != 1 && (
            <DropdownComponent
              value={currentVariant}
              setValue={setCurrentVariant}
              data={variantValueArr}
              placeholder="Change the Selected Variant"
            />
          )}
          <Text style={styles.text}>Price: ${item.unit_price / 100}</Text>

          <Text
            style={[
              styles.text,
              {
                backgroundColor:
                  currentQuantity !== item.quantity ? "#e6af2e" : "white",
              },
            ]}
          >
            {currentQuantity !== item.quantity
              ? "Changed Order Quantity"
              : "Order Quatity"}{" "}
            : {currentQuantity}
          </Text>
          <DropdownComponent
            value={currentQuantity}
            setValue={setCurrentQuantity}
            data={quantityArr}
            placeholder="Edit the Order Quantity"
          />
          {currentQuantity === 0 && (
            <Text style={styles.warning}>
              You have selected 0 quantity, this item will be deleted from your
              cart. Save & Close
            </Text>
          )}
          <View style={styles.button}>
            <Button
              title={
                currentVariant !== item.description ||
                currentQuantity !== item.quantity
                  ? "Save & Close"
                  : "Close"
              }
              color={
                currentVariant !== item.description ||
                currentQuantity !== item.quantity
                  ? "red"
                  : "#2196f3"
              }
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: "5",
  },
  container: {
    marginTop: 20,
    // flexDirection: "column",
    // alignItems: "center",
    // borderBottomWidth: 1,
    // paddingBottom: 10,
    // borderColor: "#e6e6e6",
    width: wp("90%"),
    borderWidth: 5,
    borderColor: "#000080",
    flex: 1,
    alignItems: "center",
  },
  heading: {
    paddingVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: 10,
    borderColor: "#e6af2e",
    borderWidth: 5,
    objectFit: "contain",
  },

  title: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },

  info: {
    // marginLeft: wp("3%"),
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: hp("2%"),
    width: wp("70%"),
  },
  text: {
    fontSize: 16,
    // backgroundColor: "#e6af2e",
    marginVertical: 5,
    borderRadius: 10,
    padding: 5,
  },
  button: {
    width: "70%",
    alignSelf: "center",
    marginTop: 30,
  },
  warning: {
    backgroundColor: "black",
    color: "yellow",
    fontSize: 20,
    padding: 3,
  },
});

export default CartEdit;
