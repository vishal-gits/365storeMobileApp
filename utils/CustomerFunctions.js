import baseURL from "../constants/url";

export const registerCustomer = async (
  email,
  password,
  first_name,
  last_name,
  phone
) => {
  // console.log(email, password, first_name, last_name, phone);
  const customer = await fetch(`${baseURL}/store/customers`, {
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
      // console.log(customer);
      // console.log(customer.id, "registered");
      const loggedInCustomer = await loginCustomer(email, password);
      // console.log(loggedInCustomer);
      return loggedInCustomer;
    });
  return customer;
};

export const logoutCustomer = async () => {
  // console.log("inside logout function");
  await fetch(`${baseURL}/store/auth`, {
    method: "DELETE",
    credentials: "include",
  }).then(() => {
    // console.log("customer is logged out");
  });
};

export const loginCustomer = async (email, password) => {
  // console.log(email, password);
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
      // console.log(customer, "--from login");
      // console.log(customer.id, "logged In");
      return customer;
    })
    .catch((error) => {
      console.log("Server response:", error.response);
      console.log("Error:", error);
    });
  // console.log(customer, "---outside fetch");
  return customer;
};

export const getProfileCompletion = (customer) => {
  let count = 0;

  if (!customer) {
    return 0;
  }

  if (customer.email) {
    count++;
  }

  if (customer.first_name && customer.last_name) {
    count++;
  }

  if (customer.phone) {
    count++;
  }

  if (customer.billing_address) {
    count++;
  }

  return (count / 4) * 100;
};

export const getOrders = async () => {
  const orders = await fetch(`${baseURL}/store/customers/me/orders`, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then(({ orders }) => {
      // console.log(orders, "----from getOrders");
      return orders;
    });
  return orders;
};
