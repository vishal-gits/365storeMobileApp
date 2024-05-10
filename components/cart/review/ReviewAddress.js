import { View, StyleSheet, Text } from "react-native";
import { equalAddr } from "../../../utils/addressEqualCheck";

const ReviewAddress = ({ shippingAddress, billingAddress, email }) => {
  if (billingAddress) {
    const equalAddress = equalAddr(shippingAddress, billingAddress);

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Address</Text>
        <View style={styles.addressBlock}>
          <View style={styles.addressCol}>
            <Text style={styles.innerAddressHeader}>Shipping Address</Text>
            <Text style={styles.text}>
              {`${shippingAddress.first_name} ${shippingAddress.last_name}`}
            </Text>
            <Text
              style={styles.text}
            >{`${shippingAddress.address_1} ${shippingAddress.address_2}`}</Text>
            <Text style={styles.text}>
              {shippingAddress.city + " " + shippingAddress.postal_code}
            </Text>
            {shippingAddress.state && <Text>{shippingAddress.state}</Text>}
            {shippingAddress.phone && (
              <Text style={styles.text}>Phone:{shippingAddress.phone}</Text>
            )}
            <Text style={styles.text}>Email: {email}</Text>
          </View>
          <View style={styles.addressCol}>
            <Text style={styles.innerAddressHeader}>Billing Address</Text>
            {equalAddress ? (
              <Text style={styles.text}>
                Billing address same as shipping address
              </Text>
            ) : (
              <>
                <Text style={styles.text}>
                  {`${billingAddress.first_name} ${billingAddress.last_name}`}
                </Text>
                <Text
                  style={styles.text}
                >{`${billingAddress.address_1} ${billingAddress.address_2}`}</Text>
                <Text style={styles.text}>
                  {billingAddress.city + " " + billingAddress.postal_code}
                </Text>
                {billingAddress.state && <Text>{billingAddress.state}</Text>}
                {billingAddress.phone && (
                  <Text style={styles.text}>Phone:{billingAddress.phone}</Text>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Address</Text>
        <View style={styles.addressBlock}>
          <View style={styles.addressCol}>
            <Text style={styles.innerAddressHeader}>Shipping Address</Text>
            <Text style={styles.text}>
              {`${shippingAddress.first_name} ${shippingAddress.last_name}`}
            </Text>
            <Text
              style={styles.text}
            >{`${shippingAddress.address_1} ${shippingAddress.address_2}`}</Text>
            <Text style={styles.text}>
              {shippingAddress.city + " " + shippingAddress.postal_code}
            </Text>
            {shippingAddress.state && <Text>{shippingAddress.state}</Text>}
            {shippingAddress.phone && (
              <Text style={styles.text}>Phone:{shippingAddress.phone}</Text>
            )}
            <Text style={styles.text}>Email: {email}</Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderColor: "#a5a5a5",
    marginVertical: 5,
    paddingTop: 5,
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 2,
  },
  addressBlock: {
    flexDirection: "row",
  },
  addressCol: {
    width: "50%",
  },
  innerAddressHeader: {
    textDecorationLine: "underline",
  },
  text: {
    // fontStyle: "italic",
    color: "#808080",
    fontWeight: "bold",
  },
});

export default ReviewAddress;
