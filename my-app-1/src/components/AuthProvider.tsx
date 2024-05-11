import { useContext, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

export const AuthProvider = ({ children }:{ children? : ReactNode}) => {
  const {authenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
      if(!authenticated && (location.pathname !== "/Belepes")){
        navigate('/Belepes');
      }
    },[]);
  return(
    <>
      {children}
    </>
) 
};
