import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();

const initialState = {
  products: [],
};

const ACTIONS = {
  GET_PRODUCTS: "GET_PRODUCTS",
};

const StoreReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      // console.log(action.payload, "This is action payload");
      return {
        ...state,
        products: [...state.products, ...action.payload],
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

  return (
    <StoreContext.Provider value={{ state, getProducts }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
