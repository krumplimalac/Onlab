import { Button, Container, SxProps, Theme } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState} from "react";

interface filterProp{
    name:string,
    id:number
}

export default function PizzaFilterButtons({setUrl,url}: {setUrl:Dispatch<SetStateAction<string>>, url:string}){
    const [restrictions,setRestrictions] = useState<filterProp[]>([]);
    const [toppings, setToppings] = useState<filterProp[]>([]);
    const [restrictionIds, setRestrictionIds] = useState<number[]>([]);
    const [toppingIds, setToppingIds] = useState<number[]>([]);
    const buttonSx : SxProps<Theme> = {
        backgroundColor: "#343444",
        color: "#FFFFFF",
        borderRadius: "25px", 
        margin: "1rem", 
        padding: "10px 20px 10px 20px"
    }

    const fetchRestrictions = async () => {
        try 
        {
            const response = await axios.get(`api/Restriction`);
            setRestrictions(response.data);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const fetchToppings = async () => {
        try 
        {
            const response = await axios.get(`api/Topping`);
            setToppings(response.data);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const handleRestrictionFilterButtonClick = (selected:number) => {
        if ( restrictionIds.includes(selected) ) {
            let tmp = restrictionIds.filter((v) => v !== selected);
            setRestrictionIds(tmp);
        } else {
            setRestrictionIds([...restrictionIds,selected]);
        }
    }

    const handleToppingFilterButtonClick = (selected:number) => {
        if ( toppingIds.includes(selected) ) {
            let tmp = toppingIds.filter((v) => v !== selected);
            setToppingIds(tmp);
        } else {
            setToppingIds([...toppingIds,selected]);
        }
    }

    useEffect(() => {
        fetchRestrictions();
        fetchToppings();
    },[]);

    useEffect(() => {
        let params = new URLSearchParams("");
        restrictionIds.map((i) => {
            return params.append('Restrictions',i.toString());
        });
        toppingIds.map((i)=>{
            return params.append('Toppings',i.toString());
        })
        console.log(params.toString());
        setUrl(`${url+params.toString()}`);
    },[JSON.stringify(restrictionIds),JSON.stringify(toppingIds)]);

    return(
        <Container>
            <Container sx={{display: "flex", justifyContent: "space-around"}}>
            {restrictions.map((item:filterProp)=>(
                <Button  
                variant={restrictionIds.includes(item.id) ? "contained" : "text"}
                key={item.id}  onClick={() => handleRestrictionFilterButtonClick(item.id)} 
                sx={{backgroundColor: restrictionIds.includes(item.id) ? "#343474" : "#343444", 
                borderRadius: "25px", 
                margin: "1rem", 
                padding: "10px 20px 10px 20px"}}>
                    {item.name}
                </Button>
            ))}
            <Button 
            key={-1} 
            onClick={() => (setUrl(url), setRestrictionIds([]))} 
            sx={buttonSx} >
                Mindegyik
            </Button>
            </Container> 
            <Container sx={{display: "flex", justifyContent: "space-around"}}>
            {toppings.map((item:filterProp)=>(
                <Button  
                variant={toppingIds.includes(item.id) ? "contained" : "text"}
                key={item.id}  onClick={() => handleToppingFilterButtonClick(item.id)} 
                sx={{backgroundColor: toppingIds.includes(item.id) ? "#343474" : "#343444", 
                borderRadius: "25px", 
                margin: "1rem", 
                padding: "10px 20px 10px 20px"}}>
                    {item.name}
                </Button>
            ))}
            <Button 
            key={-1} 
            onClick={() => (setUrl(url), setToppingIds([]))} 
            sx={buttonSx} >
                Mindegyik
            </Button>
        </Container> 
        </Container>
    )
}