import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import baseURL from "../../constants/url";
import { RadioButton } from "react-native-paper";
import Button from "../../components/Button";
import AddDeliveryDetailsFunction from "../../utils/AddDeliveryDetailsFunction";
import { useStoreContext } from "../../globalstore/Store";

const DeliveryScreen = ({ route, navigation }) => {
  const { updateCart } = useStoreContext();

  const { cartId } = route.params;
  // console.log(cartId, "---from delivery screen");

  const [value, setValue] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const getDeliveryOptions = async () => {
      await fetch(`${baseURL}/store/shipping-options/${cartId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(({ shipping_options }) => {
          // console.log(
          //   shipping_options,
          //   shipping_options.length,
          //   "---- from Delivery useEffect"
          // );
          setDeliveryOptions(() => [...shipping_options]);
        });
    };
    getDeliveryOptions();
  }, []);

  const handleDeliverySubmit = async (value) => {
    // console.log("Delivery Submit Pressed");
    // console.log(value);
    const deliveryDetailsCart = await AddDeliveryDetailsFunction(cartId, value);

    // console.log(
    //   deliveryDetailsCart.shipping_methods,
    //   "---- deliveryDetailsCart.shipping_methods from handleDeliverySubmit"
    // );
    await updateCart(deliveryDetailsCart);
    navigation.navigate("Checkout-Payment", { cartId: cartId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Delivery Options</Text>
      <Text style={styles.captionText}>
        Choose your preferred Delivery option
      </Text>
      {deliveryOptions && (
        <View style={styles.optionsContainer}>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            {deliveryOptions.map((option) => {
              const { name, price_incl_tax, id } = option;
              return (
                <View key={id} style={styles.outerRow}>
                  <View style={styles.innerRow}>
                    <RadioButton value={id} />
                    <Text style={styles.text}>{name}</Text>
                  </View>

                  <Text style={styles.text}>
                    ${(price_incl_tax / 100).toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </RadioButton.Group>

          {value && (
            <Button
              title="Continue to Payment"
              onPress={() => handleDeliverySubmit(value)}
              large={true}
              textSize={24}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: hp("2%"),
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderWidth: 5,
    margin: 15,
    borderColor: "#e6af2e",
    borderRadius: 30,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  captionText: {
    textAlign: "center",
    paddingVertical: 10,
  },
  optionsContainer: {
    alignItems: "center",
  },
  outerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 15,
    width: "90%",
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  innerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default DeliveryScreen;
