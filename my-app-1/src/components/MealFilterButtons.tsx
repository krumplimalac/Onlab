import { Button, Container } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState} from "react";

interface restriction {
    name:string,
    id:number
}

export default function MealFilterButtons({setUrl}: {setUrl:Dispatch<SetStateAction<string>>}){
    const [restrictions,setRestrictions] = useState<restriction[]>([]);
    const [ids, setIds] = useState<number[]>([]);
    
    const fetch = async () => {
        try 
        {
            const response = await axios.get("/api/Restriction");
            setRestrictions(response.data);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const handleFilterButtonClick = (selected:number) => {
        if ( ids.includes(selected) ) {
            let tmp = ids.filter((v) => v !== selected);
            setIds(tmp);
        } else {
            setIds([...ids,selected]);
        }
    }

    useEffect(() => {
        fetch();
    });

    useEffect(() => {
        let params = new URLSearchParams("");
        ids.map((i) => {
            return params.append("Restrictions",i.toString());
        })
        console.log(params.toString());
        setUrl(`/api/Meal?${params.toString()}`);
    },[JSON.stringify(ids)]);

    return(
        <Container sx={{display: "flex", justifyContent: "space-around"}}>
            {restrictions.map((item:restriction)=>(
                <Button  variant={ids.includes(item.id) ? "contained" : "text"} key={item.id}  onClick={() => handleFilterButtonClick(item.id)} sx={{backgroundColor: ids.includes(item.id) ? "#343474" : "#343444", borderRadius: "25px",margin: "1rem", padding: "10px 20px 10px 20px"}}>{item.name}</Button>
            ))}
            <Button key={-1} onClick={() => (setUrl(`/api/Meal?`), setIds([]))} sx={{backgroundColor: "#343444", borderRadius: "25px",margin: "1rem", padding: "10px 20px 10px 20px"}} >Mindegyik</Button>
        </Container> 
    )
}