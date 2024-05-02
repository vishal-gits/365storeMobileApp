import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { PaymentTest } from "../../utils/PaymentFunctions";
import { paymentInfoMap } from "../../constants/paymentInfo";

const PaymentRadioButton = ({
  value,
  setValue,
  handleValueChange,
  paymentSessions,
}) => {
  return (
    <>
      <RadioButton.Group
        onValueChange={(newValue) => {
          setValue(() => newValue);
          // console.log(newValue, "-----from onValueChange");
          handleValueChange(newValue);
        }}
        value={value}
      >
        {paymentSessions
          .sort((a, b) => {
            return a.provider_id > b.provider_id ? 1 : -1;
          })
          .map((session) => {
            const { id, provider_id } = session;
            // console.log(provider_id);
            return (
              <View key={id} style={styles.row}>
                <View style={styles.outerRow}>
                  <View style={styles.innerRow}>
                    <RadioButton value={provider_id} />

                    <Text style={styles.text}>
                      {paymentInfoMap[provider_id].title}
                    </Text>
                  </View>
                  <View>
                    <Text>{paymentInfoMap[provider_id].icon}</Text>
                  </View>
                </View>

                {provider_id === "manual" && <PaymentTest />}
              </View>
            );
          })}
      </RadioButton.Group>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 15,
    width: "90%",
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  outerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 15,
    width: "90%",
    // borderWidth: 2,
    // borderColor: "#e5e5e5",
    // borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  innerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default PaymentRadioButton;
