import baseURL from "../constants/url";

export const updateName = async (firstName, lastName) => {
  const updatedCustomer = await fetch(`${baseURL}/store/customers/me`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
    }),
  })
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer.id);
      return customer;
    });

  return updatedCustomer;
};

export const updateEmail = async (email) => {
  const updatedCustomer = await fetch(`${baseURL}/store/customers/me`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer.id);
      return customer;
    });

  return updatedCustomer;
};

export const updatePhone = async (phone) => {
  const updatedCustomer = await fetch(`${baseURL}/store/customers/me`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
    }),
  })
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer.id);
      return customer;
    });

  return updatedCustomer;
};

export const updatePassword = async (newPassword) => {
  const updatedCustomer = await fetch(`${baseURL}/store/customers/me`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: newPassword,
    }),
  })
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer.id);
      return customer;
    });

  return updatedCustomer;
};

export const updateBillingAddress = async (finalAddress) => {
  const updatedCustomer = await fetch(`${baseURL}/store/customers/me`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      billing_address: finalAddress,
    }),
  })
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer.id);
      console.log(
        customer.billing_address,
        "----billing Address after updation in database"
      );
      return customer;
    });

  return updatedCustomer;
};

export const addShippingAddress = async (finalAddress) => {
  console.log(finalAddress, "----finalAddress from addShppingAddress function");
  const updatedCustomer = await fetch(
    `${baseURL}/store/customers/me/addresses`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: finalAddress,
      }),
    }
  )
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer?.id);
      console.log(customer?.shipping_addresses);
      // console.log(
      //   customer.billing_address,
      //   "----billing Address after updation in database"
      // );
      return customer;
    });

  return updatedCustomer;
};

export const editShippingAddress = async (finalAddress, addressId) => {
  console.log(finalAddress, addressId, "---iniside editShippingAddress");
  const updatedCustomer = await fetch(
    `${baseURL}/store/customers/me/addresses/${addressId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: finalAddress.first_name,
        last_name: finalAddress.last_name,
        address_1: finalAddress.address_1,
        address_2: finalAddress.address_2,
        city: finalAddress.city,
        province: finalAddress.province,
        postal_code: finalAddress.postal_code,
        phone: finalAddress.phone,
        company: finalAddress.company,
        country_code: finalAddress.country_code,
      }),
    }
  )
    .then((response) => {
      console.log(response.ok, "-----response ");
      return response.json();
    })
    .then(({ customer }) => {
      console.log(customer, "----customer from last editShippingAddress ");
      console.log(customer?.id);

      return customer;
    })
    .catch((error) => {
      console.log(error);
    });

  return updatedCustomer;
};

export const deleteShippingAddress = async (addressId) => {
  const updatedCustomer = await fetch(
    `${baseURL}/store/customers/me/addresses/${addressId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then(({ customer }) => {
      console.log(customer.id);
      return customer;
    });

  return updatedCustomer;
};
