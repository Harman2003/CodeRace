import { createContext, useState } from "react";

export const ProblemContext = createContext({});
export const ProblemProvider = ({ children }) => {
    const [code, setCode] = useState(null);

  return (
    <ProblemContext.Provider value={{code, setCode}}>
      {children}
    </ProblemContext.Provider>
  );
}
