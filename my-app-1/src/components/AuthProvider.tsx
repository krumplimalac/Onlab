import { useContext, createContext, ReactNode, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }:{ children? : ReactNode}) => {
    const [authenticated,setAuthenticated] = useState(initialValue.authenticated)
    const navigate = useNavigate();
    
    if(!authenticated){
      navigate("/Belepes");
      return(
        <Navigate to="/Belepes" replace/>
      )
    }
    return(
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
    </AuthContext.Provider>
  ) 
};

export {AuthProvider, AuthContext};
