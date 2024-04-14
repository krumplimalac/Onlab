import axios, { AxiosError } from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function LogOut(){
    const navigate = useNavigate();
    useEffect(()=>{
        axios.post('/api/Auth/Logout').catch((e: AxiosError) => {}).
        then(res => {
        if ( res !== undefined ){
            if(res.status == 200){
                navigate('/Home');
            }else{
                navigate('/Etelek');
            }
        }
        });
    })
    return(null)
}