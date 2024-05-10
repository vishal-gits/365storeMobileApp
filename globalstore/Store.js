import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const initialState = {
  products: [],
  cart: {},
};

const ACTIONS = {
  GET_PRODUCTS: "GET_PRODUCTS",
  UPDATE_CART: "UPDATE_CART",
};

const StoreReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    case ACTIONS.UPDATE_CART:
      console.log(action.payload, "-----this is from cart store");
      return {
        ...state,
        cart: { ...state.cart, ...action.payload },
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState);

  const getProducts = (productList) => {
    dispatch({ type: ACTIONS.GET_PRODUCTS, payload: productList });
  };

  const updateCart = (cartItems) => {
    dispatch({ type: ACTIONS.UPDATE_CART, payload: cartItems });
  };

  return (
    <StoreContext.Provider value={{ state, getProducts, updateCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
