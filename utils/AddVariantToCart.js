import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import axios from "axios";
// import { useStoreContext } from "../globalstore/Store";

const AddVariantToCart = async (cartId, activeVariantId) => {
  //   const { state, updateCart } = useStoreContext();
  // console.log(activeVariantId, cartId, "from before fetch in AddVariantToCart");
  const cart = await fetch(`${baseURL}/store/carts/${cartId}/line-items`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variant_id: activeVariantId,
      quantity: 1,
    }),
  })
    .then((response) => response.json())
    .then(({ cart }) => {
      // console.log(cart, "cart from add variant fetch");
      return cart;
      //   updateCart(cart);
    });

  return cart;
};
export default AddVariantToCart;
