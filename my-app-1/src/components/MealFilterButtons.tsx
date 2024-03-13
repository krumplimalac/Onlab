import { Button, Container } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState} from "react";

interface restriction {
    name:string,
    id:number
}

export default function MealFilterButtons({setUrl}: {setUrl:Dispatch<SetStateAction<string>>}){
    const [restrictions,setRestrictions] = useState<restriction[]>([])
    const fetch = async () => {
        try 
        {
            const response = await axios.get("/api/Restrictions");
            setRestrictions(response.data);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch();
    })

    return(
        <Container sx={{display: "flex", justifyContent: "space-around"}}>
            {restrictions.map((item:restriction)=>(
                <Button key={item.id} onClick={() => (setUrl(`/api/Meals?Restrictions=${item.id}`))} sx={{backgroundColor: "#343444", borderRadius: "25px",margin: "1rem", padding: "10px 20px 10px 20px"}}>{item.name}</Button>
            ))}
            <Button key={-1} onClick={() => (setUrl(`/api/Meals?`))} sx={{backgroundColor: "#343444", borderRadius: "25px",margin: "1rem", padding: "10px 20px 10px 20px"}} >Mindegyik</Button>
        </Container> 
    )
}