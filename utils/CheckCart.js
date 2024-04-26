import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import axios from "axios";

const CheckCart = () => {
  const getCartId = () => {
    axios.post(`${baseURL}/store/carts`).then((res) => {
      // console.log(res.data.card.id, "from getCart");
      AsyncStorage.setItem("cart_id", res.data.cart.id);
    });
  };

  // Check cart_id
  const checkCartId = async () => {
    const cartId = await AsyncStorage.getItem("cart_id");
    // console.log(cartId), "from CheckCart";
    if (!cartId) {
      getCartId();
    }
  };

  checkCartId();
};
export default CheckCart;
