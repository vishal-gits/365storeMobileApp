import { View, Text, StyleSheet } from "react-native";
import { CardField } from "@stripe/stripe-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const StripeCard = ({ setPaymentInfo }) => {
  const handlePaymentInputChange = (cardDetails) => {
    // console.log(card, "----from handlePaymentInputChange");
    setPaymentInfo(cardDetails);
  };
  return (
    <View style={styles.payment}>
      <Text style={styles.title}>Card Details</Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          borderColor: "#a5a5a5",
          borderWidth: 2,
          borderRadius: 10,
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          handlePaymentInputChange(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  payment: {
    marginHorizontal: wp("5%"),
    marginTop: hp("4%"),
  },
  shipping: {
    marginHorizontal: wp("5%"),
  },
  title: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
  },
});

export default StripeCard;
