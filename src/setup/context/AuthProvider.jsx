import { createContext, useState } from "react";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {

    const storedAuthDetails = localStorage.getItem('auth');
    const prevAuthDetails = storedAuthDetails ? JSON.parse(storedAuthDetails) : null;
    
    const [auth, setAuth] = useState(prevAuthDetails);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )  
}


