import baseURL from "../constants/url";

export const registerCustomer = async (
  email,
  password,
  first_name,
  last_name,
  phone
) => {
  console.log(email, password, first_name, last_name, phone);
  await fetch(`${baseURL}/store/customers`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      first_name,
      last_name,
      phone,
    }),
  })
    .then((response) => response.json())
    .then(async ({ customer }) => {
      console.log(customer);
      console.log(customer.id, "registered");
      await loginCustomer(email, password);
    });
};

export const logoutCustomer = async () => {
  console.log("inside logout function");
  await fetch(`${baseURL}/store/auth`, {
    method: "DELETE",
    credentials: "include",
  }).then(() => {
    console.log("customer is logged out");
  });
};

export const loginCustomer = async (email, password) => {
  console.log(email, password);
  const customer = await fetch(`${baseURL}/store/auth`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer, "--from login");
      console.log(customer.id, "logged In");
      return customer;
    })
    .catch((error) => {
      console.log("Server response:", error.response);
      console.log("Error:", error);
    });
  console.log(customer, "---outside fetch");
  return customer;
};
