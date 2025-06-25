import { createContext, useState } from "react";

export const SinglePropertyContext = createContext("");

function SinglePropertyContextProvider({ children }) {
  const [singleProperty, setSingleProperty] = useState("");

  return (
    <SinglePropertyContext.Provider value={{ singleProperty, setSingleProperty }}>
      {children}
    </SinglePropertyContext.Provider>
  );
}

export default SinglePropertyContextProvider;
