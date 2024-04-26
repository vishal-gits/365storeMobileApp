import baseURL from "../constants/url";

const AddBillingDetailsFunction = async (cartId, address) => {
  // console.log(
  //   cartId,
  //   address,

  //   "----cartId and address from AddBillingDetailsFunction"
  // );

  const cart = await fetch(`${baseURL}/store/carts/${cartId}`, {
    method: "POST",
    credentials: "include",

    body: JSON.stringify({
      billing_address: address,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({ cart }) => {
      // console.log(
      //   cart.billing_address,

      //   "------cart from add Billing Details"
      // );

      return cart;
    })
    .catch((error) => console.log(error));

  return cart;
};
export default AddBillingDetailsFunction;
