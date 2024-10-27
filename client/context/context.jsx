import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer.js";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  dataFetching: false,
  error: false,
};

export const context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.user))
  },[state.user])
  return (
    <context.Provider
      value={{
        user: state.user,
        dataFetching: state.dataFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </context.Provider>
  );
};
