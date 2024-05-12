import React, { createContext, useContext, useReducer } from "react";

const CustomerContext = createContext();

const initialState = {};

const ACTIONS = {
  UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
  DELETE_CUSTOMER: "DELETE_CUSTOMER",
};

const CustomerReducer = (customer, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CUSTOMER:
      // console.log(action.payload, "-----this is from customer store");
      return { ...customer, ...action.payload };
    case ACTIONS.DELETE_CUSTOMER:
      // console.log("in delte_customer");
      return {};
    default:
      return customer;
  }
};

export const CustomerProvider = ({ children }) => {
  const [customer, dispatch] = useReducer(CustomerReducer, initialState);

  const updateCustomer = (customer) => {
    dispatch({ type: ACTIONS.UPDATE_CUSTOMER, payload: customer });
  };

  const deleteCustomer = () => {
    dispatch({ type: ACTIONS.DELETE_CUSTOMER });
  };

  return (
    <CustomerContext.Provider
      value={{ customer, updateCustomer, deleteCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
