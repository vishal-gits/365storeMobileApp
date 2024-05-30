import * as yup from "yup";
import baseURL from "../constants/url";
import Medusa from "@medusajs/medusa-js";
const medusa = new Medusa({ baseUrl: baseURL, maxRetries: 3 });

export const shippingValidationSchema = yup.object({
  firstName: yup.string().required("Required").max(15, "Max 15 characters"),
  lastName: yup.string().required("Required").max(15, "Max 15 characters"),
  AddressLine1: yup.string().required("Required"),
  AddressLine2: yup.string(),
  city: yup.string().required("Required").max(15, "Max 15 characters"),
  province: yup.string().max(15, "Max 25 characters"),
  postalCode: yup
    .number()
    .required("Required")
    .typeError("Provide in postalcode number format"),
  phone: yup.string().max(10, "Max 10 digits"),
  company: yup.string().max(15, "Max 25 characters"),
  email: yup.string().email().required(),
});

export const ValidateAll = async (
  validationSchema,
  data,
  setErrors,
  dataIsValid
) => {
  // Check if the entire object is valid
  // console.log(data, "---data from validation");
  await validationSchema
    .isValid(data)
    .then((valid) => {
      if (valid) {
        // console.log("Data is valid");
        // Clear errors if data is valid
        setErrors({});
        dataIsValid.current = true;
      } else {
        // console.log("Data is invalid");
        // Validate individual fields to get errors
        validationSchema
          .validate(data, { abortEarly: false })
          .then((validatedData) => {
            console.log("Validated data:", validatedData);
          })
          .catch(async (validationErrors) => {
            console.log("Validation errors:", validationErrors.errors);
            dataIsValid.current = false;
            // Set individual errors
            await setErrors(
              validationErrors.inner.reduce((acc, err) => {
                acc[err.path] = err.message;
                // console.log(acc);
                return acc;
              }, {})
            );
          });
      }
    })
    .catch((error) => {
      console.error("Validation error:", error);
    });
};

export const billingValidationSchema = yup.object({
  firstName: yup.string().required("Required").max(15, "Max 15 characters"),
  lastName: yup.string().required("Required").max(15, "Max 15 characters"),
  AddressLine1: yup.string().required("Required"),
  AddressLine2: yup.string(),
  city: yup.string().required("Required").max(15, "Max 15 characters"),
  province: yup.string().max(15, "Max 25 characters"),
  postalCode: yup
    .number()
    .required("Required")
    .typeError("Provide in postalcode number format"),
  phone: yup.string().max(10, "Max 10 digits"),
  company: yup.string().max(15, "Max 25 characters"),
});

export const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .matches(/(\w.+)/, "Enter first name")
    .required("required"),
  lastName: yup
    .string()
    .matches(/(\w.+)/, "Enter last name")
    .required("required"),
  phone: yup
    .string()
    .matches(/(\d){9}\b/, "Valid phone number should be of 9 digits")
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    // .matches(/\d/, "Password must have a number")
    // .matches(
    //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //   "Password must have a special character"
    // )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const nameValidationSchema = yup.object({
  firstName: yup.string().required("Required").max(15, "Max 15 characters"),
  lastName: yup.string().required("Required").max(15, "Max 15 characters"),
});

export const emailValidationSchema = yup.object({
  email: yup.string().email().required(),
});

export const phoneValidationSchema = yup.object({
  phone: yup
    .string()
    .matches(/(\d){9}\b/, "Valid phone number should be of 9 digits")
    .required("Phone number is required"),
});

export const passwordValidationSchema = yup.object({
  oldPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  newPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const billingAddressValidationSchema = yup.object({
  firstName: yup.string().required("Required").max(15, "Max 15 characters"),
  lastName: yup.string().required("Required").max(15, "Max 15 characters"),
  AddressLine1: yup.string().required("Required"),
  AddressLine2: yup.string(),
  city: yup.string().required("Required").max(15, "Max 15 characters"),
  province: yup.string().max(15, "Max 25 characters"),
  company: yup.string().max(15, "Max 25 characters"),
  postalCode: yup
    .number()
    .required("Required")
    .typeError("Provide in postalcode number format"),
});

export const shippingAddressValidationSchema = yup.object({
  firstName: yup.string().required("Required").max(15, "Max 15 characters"),
  lastName: yup.string().required("Required").max(15, "Max 15 characters"),
  AddressLine1: yup.string().required("Required"),
  AddressLine2: yup.string(),
  city: yup.string().required("Required").max(15, "Max 15 characters"),
  province: yup.string().max(15, "Max 25 characters"),
  company: yup.string().max(15, "Max 25 characters"),
  postalCode: yup
    .number()
    .required("Required")
    .typeError("Provide in postalcode number format"),
  phone: yup.string().max(10, "Max 10 digits"),
});

export const authenticatePassword = (email, oldPassword) => {
  const customerId = fetch(`${baseURL}/store/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: oldPassword,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.customer.id) {
        return json.customer.id;
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Password is incorrect");
    });

  return customerId;
};

export const equalPasswords = (newPassword, confirmPassword) => {
  // console.log(
  //   newPassword,
  //   confirmPassword,
  //   "---newPassword and confirmPassword"
  // );
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match ");
    return false;
  } else {
    return true;
  }
};

export const ValidatePassword = async (
  validationSchema,
  data,
  setErrors,
  dataIsValid,
  email
) => {
  // Check if the entire object is valid
  // console.log(data, "---data from validation");
  const newPassword = data.newPassword;
  const oldPassword = data.oldPassword;
  const confirmPassword = data.confirmPassword;
  await validationSchema
    .isValid(data)
    .then(async (valid) => {
      if (valid) {
        // console.log("Data is valid");
        // Clear errors if data is valid
        const customerId = await authenticatePassword(email, oldPassword);

        // console.log(customerId, "-- from inside vaidate password");
        // console.log(
        //   data.newPassword,
        //   data.confirmPassword,
        //   "---newPassword and confirmPassword before Equality"
        // );
        const passwordEquality = equalPasswords(newPassword, confirmPassword);
        // console.log(
        //   customerId,
        //   passwordEquality,
        //   "----customerId, passwordEquality"
        // );
        if (customerId && passwordEquality) {
          // console.log("ENTERED");
          setErrors({});
          dataIsValid.current = true;
        } else {
          dataIsValid.current = false;
        }
      } else {
        console.log("Data is invalid");
        // Validate individual fields to get errors
        validationSchema
          .validate(data, { abortEarly: false })
          .then((validatedData) => {
            console.log("Validated data:", validatedData);
          })
          .catch(async (validationErrors) => {
            console.log("Validation errors:", validationErrors.errors);
            dataIsValid.current = false;
            // Set individual errors
            await setErrors(
              validationErrors.inner.reduce((acc, err) => {
                acc[err.path] = err.message;
                // console.log(acc);
                return acc;
              }, {})
            );
          });
      }
    })
    .catch((error) => {
      console.error("Validation error:", error);
    });
};
