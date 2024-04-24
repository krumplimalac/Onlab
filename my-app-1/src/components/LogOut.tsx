import axios, { AxiosError } from "axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../App";
import SnackBar from "./SnackBar";

export default function LogOut(){
    const navigate = useNavigate();
    let user = useContext(UserContext);
    let auth = useContext(AuthContext);
    useEffect(()=>{
        axios.post('/api/Auth/Logout').catch((e: AxiosError) => {}).
        then(res => {
        if ( res !== undefined ){
            if(res.status == 200){
                user.email = "";
                user.role = "";
                auth.setAuthenticated(false);
                document.cookie = "MyCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT;Samesite=None;Secure";
                localStorage.clear();
                navigate('/Home');
            }else{
                return(
                    <SnackBar text="Hiba" error={true} isOpen={true} />  
                )
            }
        }
        });
    })
    return(null)
}