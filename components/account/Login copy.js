import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { loginCustomer } from "../../utils/CustomerFunctions";

const Login = ({ setMode, navigation }) => {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });
  return (
    <>
      <Text style={styles.textHeader}>Welcome to 365 Store</Text>
      <Text style={styles.text}>Login for greater shopping experience</Text>

      <View style={styles.loginContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            const email = values.email;
            const password = values.password;
            await loginCustomer(email, password);
            navigation.navigate("Overview");
          }}
          validationSchema={loginValidationSchema}
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
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                style={styles.textInput}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                style={styles.textInput}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 1 },
                  styles.signIn,
                ]}
                disabled={!isValid}
              >
                <Text style={styles.signInText}>Login</Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
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
          Not a member?
        </Text>
        <Button
          title="Register"
          small="true"
          onPress={() => {
            setMode("Register");
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  errorText: {
    fontSize: 12,
    color: "red",
  },
});

export default Login;
