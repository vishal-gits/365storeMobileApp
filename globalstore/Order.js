import React, { createContext, useContext, useReducer } from "react";

const OrderContext = createContext();

const initialState = {
  order: {},
};

const ACTIONS = {
  UPDATE_ORDER: "UPDATE_ORDER",
};

const StoreReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_ORDER:
      console.log(action.payload, "-----this is from order store");
      return {
        ...state,
        cart: { ...state.order, ...action.payload },
      };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const getProducts = (productList) => {
    dispatch({ type: ACTIONS.GET_PRODUCTS, payload: productList });
  };

  const updateCart = (cartItems) => {
    dispatch({ type: ACTIONS.UPDATE_CART, payload: cartItems });
  };

  const updateOrder = (order) => {
    dispatch({ type: ACTIONS.UPDATE_ORDER, payload: order });
  };

  return (
    <StoreContext.Provider
      value={{ state, getProducts, updateCart, updateOrder }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
