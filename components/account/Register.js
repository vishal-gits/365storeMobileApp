import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { registerValidationSchema } from "../../utils/validationSchema";
import { registerCustomer } from "../../utils/CustomerFunctions";
import { useCustomerContext } from "../../globalstore/Customer";

const Register = ({ setMode, navigation }) => {
  const { updateCustomer } = useCustomerContext();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      {!keyboardVisible && (
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Become a 365 Store Member</Text>
          <Text style={styles.text}>
            Create your 365 Store Member profile, and get access to an enhanced
            shopping experience.
          </Text>
        </View>
      )}

      <View style={styles.registerContainer}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const email = values.email;
            const first_name = values.firstName;
            const last_name = values.lastName;
            const phone = values.phone;
            const password = values.password;
            const customerDetails = await registerCustomer(
              email,
              password,
              first_name,
              last_name,
              phone
            );
            // console.log(customerDetails, "---customerDetails form Register");
            updateCustomer(customerDetails);
            setMode("Login");
            navigation.navigate("Customer", { screen: "Overview" });
          }}
          validationSchema={registerValidationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <>
              <TextInput
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholder="First Name*"
                style={styles.textInput}
              />
              {errors.firstName && touched.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
              <TextInput
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                placeholder="Last Name*"
                style={styles.textInput}
              />
              {errors.lastName && touched.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email*"
                style={styles.textInput}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                placeholder="Phone"
                style={styles.textInput}
              />
              {errors.phone && touched.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password*"
                style={styles.textInput}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {!keyboardVisible && (
                <Text style={styles.text}>
                  By creating an account, you agree to 365 Store's Privacy
                  Policy and Terms of Use.
                </Text>
              )}
              {!keyboardVisible && (
                <Pressable
                  onPress={handleSubmit}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1 },
                    styles.signIn,
                  ]}
                  disabled={!isValid}
                >
                  <Text style={styles.signInText}>Register</Text>
                </Pressable>
              )}
            </>
          )}
        </Formik>
      </View>
      {!keyboardVisible && (
        <View style={styles.joinRow}>
          <Text
            style={[
              styles.text,
              {
                paddingRight: 10,
                fontStyle: "italic",
                textDecorationLine: "underline",
              },
            ]}
          >
            Already a member?
          </Text>
          <Button
            title="Login"
            small="true"
            onPress={() => {
              setMode("Login");
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginVertical: 5,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerContainer: {
    width: "75%",
    alignItems: "center",
  },
  registerContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
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
    marginTop: 10,
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});

export default Register;
