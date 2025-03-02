import { Card, CardContent, Container, Grid, IconButton, Pagination, Typography, styled } from "@mui/material";
import axios, { AxiosHeaders } from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import '../index.css';

interface myProp {
    name: string,
    id: number,
    type: string
}

interface paginationHeader {
    TotalCount: number,
    PageSize: number,
    CurrentPage: number,
    TotalPages: number,
    HasNext: boolean,
    HasPrevious: boolean
}

export default function Toppings(){
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [items, setItems] = useState<myProp[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const StyledPagination = styled(Pagination)(({ theme }) => ({
        "& .MuiPaginationItem-root": {
            color: "#FFFFFF"
        }
    }));

    const fetchItems = async (page:number) => {
        try {
            //const response = await axios.get(`/api/Topping/&PageNumber=${page}&PageSize=6`);
            const response = await axios.get('/api/Topping');
            const headers = response.headers;
            if (headers instanceof AxiosHeaders && headers.has('x-pagination')) {
                let header: paginationHeader = JSON.parse(headers['x-pagination']);
                setTotalPages(header.TotalPages);
            }
            setItems(response.data);
        } catch (error) {
            setItems([]);
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchItems(currentPage);
        setLoading(false)
    }, [currentPage]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    function AddButton(){
        if (user.role == 'Admin'){
            return (
                <IconButton size="large" onClick={() => navigate('/Ujetel')} sx={{color: "#FFFFFF", backgroundColor: "#40444A", padding: "20px", marginLeft: "20px"}}>
                    <AddIcon fontSize="inherit"/>
                </IconButton>
            )
        }
    }

    return(
        <Container disableGutters maxWidth={false} sx={{marginTop: '2rem'}}>
            { loading ? <Loading/> : null }
            <Container maxWidth={false}>
                <Container disableGutters maxWidth={false} sx={{display: "flex", alignItems: "center"}}>
                    <Typography variant='h1'>
                        Feltétek
                    </Typography>
                    <Container disableGutters maxWidth={false} sx={{display: "flex", justifyContent: "end"}}>
                        <AddButton/>
                    </Container>
                </Container>
                <Container maxWidth={false}>
                    <Grid container spacing={{xs: 1, sm: 2, md: 4}} >
                        {items.map((item) => {
                            return(
                                <Grid item xs={12} md={6} lg={4} key={item.id}>
                                    <Card key={item.id} sx={{borderRadius: "20px", backgroundColor: "#30343A"}}>
                                        <CardContent>
                                            <Typography sx={{color: 'white'}}>
                                                {item.name}
                                            </Typography>
                                        <Container>
                                            {item.type}
                                        </Container>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </Container>
            <StyledPagination
            sx={{
                display: "flex",
                justifyContent: "center", 
                backgroundColor: "#343444", 
                height: "80px", 
                marginTop: "2rem"
            }}
            size={"large"} 
            count={totalPages} 
            page={currentPage} 
            onChange={handleChange}/>
        </Container>
    )
}