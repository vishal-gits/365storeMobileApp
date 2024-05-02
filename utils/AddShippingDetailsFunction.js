import baseURL from "../constants/url";

const AddShippingDetailsFunction = async (cartId, address, email) => {
  console.log(
    cartId,
    address,
    email,
    "----cartId and address from AddShippingDetailsFunction"
  );

  const cart = await fetch(`${baseURL}/store/carts/${cartId}`, {
    method: "POST",
    credentials: "include",

    body: JSON.stringify({
      shipping_address: address,
      email: email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({ cart }) => {
      console.log(
        cart.shipping_address,
        cart.email,
        "------cart from add Shipping Details"
      );

      return cart;
    })
    .catch((error) => console.log(error));

  return cart;
};
export default AddShippingDetailsFunction;
