import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Formik } from "formik";
import Login from "../../components/account/Login";
import Register from "../../components/account/Register";
import { useCustomerContext } from "../../globalstore/Customer";

const AccountScreen = ({ navigation }) => {
  const { customer } = useCustomerContext();

  const customerId = customer?.id;
  // console.log(customerId, "----from AccountScreen");
  const [mode, setMode] = useState("Login");

  useEffect(() => {
    navigation.setOptions({
      title: mode === "Register" ? "Register" : "Login",
    });
  }, [navigation, mode]);

  return (
    <View style={styles.container}>
      {mode === "Login" && <Login {...{ setMode }} />}
      {mode === "Register" && <Register {...{ setMode }} />}
    </View>
    // <>
    //   {customerId ? (
    //     <Overview />
    //   ) : (
    //     <View style={styles.container}>
    //       {mode === "Login" && <Login {...{ setMode, navigation }} />}
    //       {mode === "Register" && <Register {...{ setMode, navigation }} />}
    //     </View>
    //   )}
    // </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    elevation: 10,
    borderWidth: 5,
    margin: 5,
    borderColor: "#e6af2e",
    borderRadius: 30,
    // height: 400,
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingLeft: 10,
  },
  signIn: {
    width: "80%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "#e6af2e",
  },
  signInText: {
    fontSize: 16,
    color: "#000080",
  },
  joinRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});

export default AccountScreen;

// (
//         <>
//           <Button
//             title="Login"
//             small="true"
//             onPress={() => {
//               setMode("Login");
//             }}
//           />
//         </>
//       )
