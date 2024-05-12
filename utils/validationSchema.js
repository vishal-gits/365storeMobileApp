import * as yup from "yup";

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
