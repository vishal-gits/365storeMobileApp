import React, { createContext, useContext, useReducer } from "react";

const OrderContext = createContext();

const initialState = {};

const ACTIONS = {
  UPDATE_ORDER: "UPDATE_ORDER",
};

const OrderReducer = (order, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_ORDER:
      // console.log(action.payload, "-----this is from order store");
      return { ...order, ...action.payload };
    default:
      return order;
  }
};

export const OrderProvider = ({ children }) => {
  const [order, dispatch] = useReducer(OrderReducer, initialState);

  const updateOrder = (order) => {
    dispatch({ type: ACTIONS.UPDATE_ORDER, payload: order });
  };

  return (
    <OrderContext.Provider value={{ order, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
