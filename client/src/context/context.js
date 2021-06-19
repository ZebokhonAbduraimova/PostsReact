import React, { createContext, useContext, useReducer } from "react";
import { rootReducer, initialState } from "./reducers";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(rootReducer, initialState)}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
