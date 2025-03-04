import axios, { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../App";
import SnackBar from "./SnackBar";

export default function LogOut(){
    const navigate = useNavigate();
    let user = useContext(UserContext);
    let auth = useContext(AuthContext);
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        axios.post('/api/Auth/Logout').catch((e: AxiosError) => {
            console.log(e);
        }).
        then(res => {
        if ( res !== undefined ){
            if(res.status == 200){
                user.email = "";
                user.role = "";
                user.id = "";
                auth.setAuthenticated(false);
                document.cookie = "MyCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT;Samesite=None;Secure";
                localStorage.clear();
                navigate('/Home');
            }else{
                 setOpen(true);     
            }
        }
        });
    })
    return(
        <SnackBar text="Hiba" error={true} isOpen={open} setIsOpen={setOpen}/>
    )
}