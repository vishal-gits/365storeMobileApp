import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import axios from "axios";
// https://rapidapi.com/guides/request-body-axios , fixing specific region for us/NA

const CheckCart = async () => {
  const cartId = await AsyncStorage.getItem("cart_id");

  if (cartId) {
    // console.log(cartId, "--- from checkCart");
    return cartId;
  } else {
    const cartId = await fetch(`${baseURL}/store/carts`, {
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
      .then(async ({ cart }) => {
        await AsyncStorage.setItem("cart_id", cart.id);
        // console.log(cart.id, "---from getCardId");
        return cart.id;
      });
    return cartId;
  }
};
export default CheckCart;

// const getCartId = async () => {
//   await fetch(`${baseURL}/store/carts`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       region_id: "reg_01HWSC9RJJY8X1RT2TWEFQWX5B",
//     }),
//   })
//     .then((response) => response.json())
//     .then(({ cart }) => {
//       AsyncStorage.setItem("cart_id", cart.id);
//       console.log(cart.id, "---from getCardId");
//     });
// };

// // Check cart_id
// const checkCartId = async () => {
//   const cartId = await AsyncStorage.getItem("cart_id");

//   if (cartId) {
//     console.log(cartId, "----from CheckCart");
//     // await AsyncStorage.removeItem("cart_id");
//     // getCartId();
//   }

//   if (!cartId) {
//     getCartId();
//   }
// };

// checkCartId();

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
