import MyCard from "../components/Card_temalab";
import { useState, useEffect } from 'react';
import axios from 'axios';

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
            <h1>
                Etelek
            </h1>
           <MyCard items={menu} />
        
        </>
    )
}