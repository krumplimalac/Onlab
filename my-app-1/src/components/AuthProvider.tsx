import { useContext, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../App";

export const AuthProvider = ({ children }:{ children? : ReactNode}) => {
  const authenticated = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function check() {
      if((!authenticated.authenticated) && (location.pathname !== "/Belepes")){
        navigate('/Belepes');
      }
      return;
    }

    useEffect(() => {
      check();
    },[authenticated]);

  return(
    <>
      {children}
    </>
) 
};
