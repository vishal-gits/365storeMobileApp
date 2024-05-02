import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useStoreContext } from "../../globalstore/Store";
import Button from "../../components/Button";
import PaymentRadioButton from "../../components/cart/PaymentRadioButton";
import StripeCard from "../../components/cart/StripeCard";
import {
  initializePaymentSessions,
  setPaymentProvider,
} from "../../utils/PaymentFunctions";
import Loading from "../../utils/Loading";

const PaymentScreen = ({ route, navigation }) => {
  const { cartId } = route.params;
  // console.log(cartId);

  const { state, updateCart } = useStoreContext();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [paymentSessions, setPaymentSessions] = useState(null);

  const [value, setValue] = useState("");

  useEffect(() => {
    initializePaymentSessions(cartId, setPaymentSessions);
  }, []);

  const handleValueChange = async (newValue) => {
    // console.log(newValue, "----from handleValueChange");
    const updatedCart = await setPaymentProvider(cartId, newValue);
    await updateCart(updatedCart);
    // console.log(state.cart, "---- state.cart from handleValueChange");
  };

  return (
    <>
      {!paymentSessions ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>PaymentScreen</Text>
          {paymentSessions && (
            <View style={styles.optionsContainer}>
              <PaymentRadioButton
                {...{ value, setValue, handleValueChange, paymentSessions }}
              />
              {value === "stripe" && <StripeCard {...{ setPaymentInfo }} />}
              {(value === "manual" || Object.keys(paymentInfo).length > 0) && (
                <Button
                  title="Continue to Review Order"
                  // onPress={() => handleReviewOrderSubmit(value)}
                  onPress={() => {
                    if (value === "stripe") {
                      if (!paymentInfo.complete) {
                        alert("Please enter correct card details");
                      } else {
                        navigation.navigate("Checkout-Review", {
                          paymentInfo,
                        });
                      }
                    } else if (value === "manual") {
                      navigation.navigate("Checkout-Review", {
                        paymentInfo,
                      });
                    }

                    // console.log(paymentInfo, "i am pressed");
                  }}
                  large={true}
                  textSize={24}
                />
              )}
            </View>
          )}
        </View>
      )}
    </>
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

  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default PaymentScreen;
