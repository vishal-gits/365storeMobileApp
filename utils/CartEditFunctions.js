import baseURL from "../constants/url";

export const CartEditCheckFunction = (currentValue, initialValue) => {
  console.log(
    currentValue,
    initialValue,
    "---current and initialValue from CartEditCheckFunction"
  );
  if (currentValue !== initialValue) {
    return true;
  } else {
    return false;
  }
};

export const qtyArr = () => {
  const tempArr = [];

  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) =>
    tempArr.push({ label: num.toString(), value: num })
  );

  return tempArr;
};

export const RemoveCart = async (cartId, lineItemId) => {
  const cart = await fetch(
    `${baseURL}/store/carts/${cartId}/line-items/${lineItemId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then(({ cart }) => {
      //   console.log(cart, "---from RemoveCart");
      return cart;
    });
  return cart;
};

export const UpdateCartInfo = async (cartId, lineItemId, currentQuantity) => {
  const cart = await fetch(
    `${baseURL}/store/carts/${cartId}/line-items/${lineItemId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: currentQuantity,
      }),
    }
  )
    .then((response) => response.json())
    .then(({ cart }) => {
      //   console.log(cart, "---from UpdateCart");
      return cart;
    });
  return cart;
};
