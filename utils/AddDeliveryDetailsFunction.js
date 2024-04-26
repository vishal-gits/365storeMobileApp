import baseURL from "../constants/url";

const AddDeliveryDetailsFunction = async (cartId, value) => {
  //   console.log(
  //     cartId,
  //     value,

  //     "----cartId and value from AddDeliveryDetailsFunction"
  //   );

  const cart = await fetch(
    `${baseURL}/store/carts/${cartId}/shipping-methods`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        option_id: value, // ID of the selected option
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then(({ cart }) => {
      //   console.log(
      //     cart.shipping_methods,

      //     "------cart.shipping_methods from Delivery Details cart fetch"
      //   );

      return cart;
    })
    .catch((error) => console.log(error));

  return cart;
};
export default AddDeliveryDetailsFunction;
