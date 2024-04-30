import { Card, CardMedia, Container, IconButton, Typography } from "@mui/material"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import DeleteIcon from '@mui/icons-material/Delete';

interface image {
    bytes: string
  }

interface newsProp {
    title: string,
    description: string,
    date:string,
    image: image
}

export default function DetailedNews(){
    const [item, setItem] = useState<newsProp>();
    const params = useParams();
    const navigate = useNavigate();
    const user = useContext(UserContext);
    
    const handleDelete = () => {
        axios.delete(`/api/News/${params.id}`)
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
        const response = await axios.get(`/api/News/${params.id}`);
        let res = response.data;
        setItem(res);
    }

    useEffect(()=>{
        fetch(params);
    },[])

    if (item != undefined){
        let img = item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image.bytes}`;
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
                            {item.title}   
                        </Typography>
                        <Container maxWidth={false} sx={{display: "flex", margin: "5px", justifyContent:"space-between"}}> 
                            <DeleteButton/>
                        </Container>      
                        <Container sx={{display: "flex", margin: "5px"}}>
                            <Typography sx={{color: 'white', backgroundColor: "#50545A",borderRadius: "25px", padding: "10px",flexWrap:"wrap"}}>{item.date}</Typography>
                        </Container>
                            <Typography sx={{marginTop: "15px",backgroundColor: "#353940", padding: "2rem"}}>
                                {item.description}
                            </Typography>
                    </Container>
            </Container>
        )
    }
}