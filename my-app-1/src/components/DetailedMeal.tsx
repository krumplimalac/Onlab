import axios from "axios";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom"
import {Restrictions} from "./MyCard";
import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material";

interface restriction {
    id: number,
    name: string
}

interface image {
  bytes: string
}

interface prop {
    name: string,
    description: string,
    id: number,
    price: number,
    restrictions: restriction[],
    image: image
}

export default function DetailedMeal(){
    const [meal, setMeal] = useState<prop>();
    const params = useParams();
    console.log(params)
    const fetch = async (params:Params<string>) => {
        const response = await axios.get(`/api/Meals/${params.id}`);
        let res = response.data;
        setMeal(res);
    }

    useEffect(()=>{
        fetch(params);
    },[])
    
    if (meal != undefined){
        let img = meal.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${meal.image.bytes}`; 
        return(
            <Container disableGutters maxWidth={false} sx={{ maxWidth: "1400px", backgroundColor: "#30343A"}}>
                <Card>
                    <CardMedia 
                        component = 'img'
                        height="400px"
                        image={img}/>  
                </Card>
                <Container disableGutters maxWidth={false}>
                     <Typography variant='h2' sx={{color: 'white', margin: "2rem", marginBottom: "2px"}}>
                        {meal.name}   
                    </Typography>
                    <Container sx={{display: "flex", margin: "5px"}}>
                        <Typography variant='h5' sx={{color: 'white',backgroundColor:'#20242A',borderRadius: "25px", padding: "10px", flexWrap:"wrap"}}>
                            Ár: {meal.price}   
                        </Typography> 
                    </Container>      
                    <Container sx={{display: "flex", margin: "5px"}}>
                        <Typography sx={{color: 'white', backgroundColor: "#50545A",borderRadius: "25px", padding: "10px",flexWrap:"wrap"}}><Restrictions item={meal}/></Typography>
                    </Container>
                        <Typography sx={{marginTop: "15px",backgroundColor: "#353940", padding: "2rem"}}>
                            {meal.description}
                        </Typography>
                </Container>
            </Container>
        )
    }
}