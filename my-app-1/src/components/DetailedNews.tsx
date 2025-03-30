import { Card, CardMedia, Container, IconButton, Typography } from "@mui/material"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loading from "./Loading";

interface newsProp {
    title: string,
    description: string,
    date:string,
    image: string
}

export default function DetailedNews(){
    const [item, setItem] = useState<newsProp>();
    const params = useParams();
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    
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

    function EditButton(){
        if (user.role == 'Admin'){
            return (
                <IconButton size="large" onClick={() => navigate(`/Hirek/${params.id}/Edit`)} sx={{color: "#FFFFFF", backgroundColor: "#20242A", padding: "20px", marginLeft: "20px"}}>
                    <EditIcon fontSize="inherit"/>
                </IconButton>
            )
        }
    }

    const fetch = async (params:Params<string>) => {
        setLoading(true);
        const response = await axios.get(`/api/News/${params.id}`);
        let res = response.data;
        setItem(res);
        setLoading(false);
    }

    useEffect(()=>{
        fetch(params);
    },[])

    if (item != undefined){
        let img = item.image == "" ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image}`;
        return(
            <Container disableGutters maxWidth={false} sx={{ maxWidth: "1400px", backgroundColor: "#30343A"}}>
                { loading ? <Loading/> : null }
                    <Card>
                        <CardMedia 
                            component = 'img'
                            height="400px"
                            image={img}/>  
                    </Card>
                    <Container disableGutters maxWidth={false} sx={{marginTop: "5px"}}>
                        <Container maxWidth={false} sx={{display: "flex", justifyContent:"space-between"}}> 
                        <Typography variant='h2' sx={{color: 'white', marginBottom: "2px"}}>
                            {item.title}   
                        </Typography>
                        <Container disableGutters sx={{display: "flex", justifyContent: "end"}}>
                            <DeleteButton/>
                            <EditButton/>
                        </Container>
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