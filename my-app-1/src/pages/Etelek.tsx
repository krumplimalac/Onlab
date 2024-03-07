import MyCard from "../components/Card_temalab";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from "@mui/material";

export default function Etelek(){

    const [menu, setMenu] = useState([]);
   
    const client = axios.create({
   baseURL: '/api/MenuItems' 
});

useEffect(() => {
    const fetchMenu = async () => {
        let response = await client.get('');
        setMenu(response.data)
    };
    fetchMenu();
 }, []);

    return(
        <>
            <Typography variant="h2" sx={{marginLeft:"10%", marginTop:"2rem", typography: {xs: "h3", md: "h2", lg: "h1"}}}>
                Ételek
            </Typography>
           <MyCard items={menu} />
        
        </>
    )
}