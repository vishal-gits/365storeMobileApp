import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import axios from "axios";
// https://rapidapi.com/guides/request-body-axios , fixing specific region for us/NA

const CheckCart = async () => {
  const getCartId = async () => {
    await fetch(`${baseURL}/store/carts`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region_id: "reg_01HWSC9RJJY8X1RT2TWEFQWX5B",
      }),
    })
      .then((response) => response.json())
      .then(({ cart }) => {
        AsyncStorage.setItem("cart_id", cart.id);
        console.log(cart.id, "---from getCardId");
      });
  };

  // Check cart_id
  const checkCartId = async () => {
    const cartId = await AsyncStorage.getItem("cart_id");

    if (cartId) {
      console.log(cartId, "----from CheckCart");
      await AsyncStorage.removeItem("cart_id");
      getCartId();
    }

    if (!cartId) {
      getCartId();
    }
  };

  checkCartId();
};
export default CheckCart;

// for doing the above in single instance
// const cartId = await AsyncStorage.getItem("cart_id");

// if (cartId) {
//   return cartId;
// } else {
//   const cartId = await axios.post(`${baseURL}/store/carts`).then((res) => {
//     AsyncStorage.setItem("cart_id", res.data.cart.id);
//     console.log(res.data.cart.id);
//     return res.data.cart.id;
//   });
//   return cartId;
// }

//for upating one time region

// fetch(`${baseURL}/store/carts/${cartId}`, {
//   method: "POST",
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     region_id: "reg_01HWSC9RJJY8X1RT2TWEFQWX5B",
//   }),
// })
//   .then((response) => response.json())
//   .then(({ cart }) => {
//     console.log(cart, "---after updating region");
//   });

//for removing cart id one time
// await AsyncStorage.removeItem("cart_id");

// axios
//   .post(
//     `${baseURL}/store/carts`,
//     [{ region_id: "reg_01HWSC9RJJY8X1RT2TWEFQWX5B" }],
//     {
//       params: { "api-version": "3.0" },
//       headers: { "content-Type": "application/json" },
//     }
//   )
//   .then((res) => {
//     console.log(res.data.cart.id, "---from getCart");
//     AsyncStorage.setItem("cart_id", res.data.cart.id);
//   });
