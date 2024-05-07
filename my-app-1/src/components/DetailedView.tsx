import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Params, useParams, useNavigate } from "react-router-dom"
import { Card, CardMedia, Container, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from "../App";

interface myProp {
    name: string,
    description: string,
    id: number,
    price: number,
    type: string,
    image: string
}

export default function DetailedView({path}:{path:string}){
    const [item, setItem] = useState<myProp>();
    const params = useParams();
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const handleDelete = () => {
        axios.delete(`/api/${path+'/'+params.id}`)
        .then(res => {
            if(res.status == 200) {
                navigate('./..');
            }
        });
        
    }

    function DeleteButton(){
        if (user.role == 'Admin'){
            return (
                <IconButton size="large" onClick={handleDelete} sx={{color: "#FFFFFF", backgroundColor: "#20242A", padding: "20px"}}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            )
        }
    }

    const fetch = async (params:Params<string>) => {
        const response = await axios.get(`/api/${path+'/'+params.id}`);
        let res = response.data;
        setItem(res);
    }

    useEffect(()=>{
        fetch(params);
    },[])
    
    if (item != undefined){
        const img = item.image.length == 0 || item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image}`;
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
                        {item.name}   
                    </Typography>
                    <Container maxWidth={false} sx={{display: "flex", margin: "5px", justifyContent:"space-between"}}>
                        <Typography variant='h5' sx={{color: 'white',backgroundColor:'#20242A',borderRadius: "50px", padding: "10px", paddingTop: "15px"}}>
                            {item.price} Ft   
                        </Typography> 
                        <DeleteButton/>
                    </Container>      
                    <Container sx={{display: "flex", margin: "5px"}}>
                        <Typography sx={{color: 'white', backgroundColor: "#50545A",borderRadius: "25px", padding: "10px",flexWrap:"wrap"}}>{item.type}</Typography>
                    </Container>
                        <Typography sx={{marginTop: "15px",backgroundColor: "#353940", padding: "2rem"}}>
                            {item.description}
                        </Typography>
                    
                </Container>
            </Container>
        )
    }
}