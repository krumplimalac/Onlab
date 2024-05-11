import { Button, Container, Grid, IconButton, Pagination, Typography, styled } from "@mui/material";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { useContext, useEffect, useState } from "react";
import MyCard from "../components/MyCard";
import FilterButtons from "./FilterButtons";
import Loading from "./Loading";
import PizzaFilterButtons from "./PizzaFilterButtons";
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import '../index.css';

interface myProp {
    name: string,
    description: string,
    id: number,
    price: number,
    type: string,
    image: string
}

interface paginationHeader {
    TotalCount: number,
    PageSize: number,
    CurrentPage: number,
    TotalPages: number,
    HasNext: boolean,
    HasPrevious: boolean
}

export default function Italok({urlProp,title,addUrl}:{urlProp:string, title:string, addUrl:string}){
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [items, setItems] = useState<myProp[]>([]);
    const [url, setUrl] = useState(urlProp);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const StyledPagination = styled(Pagination)(({ theme }) => ({
        "& .MuiPaginationItem-root": {
            color: "#FFFFFF"
        }
    }));

    const fetchItems = async (page:number) => {
        try {
            const response = await axios.get(url+`&PageNumber=${page}&PageSize=6`);
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
        console.log(url);
        setLoading(true);
        fetchItems(currentPage);
        setLoading(false)
        console.log(url);
    }, [currentPage, url]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    function AddButton(){
        if (user.role == 'Admin'){
            return (
                <IconButton size="large" onClick={() => navigate(addUrl)} sx={{color: "#FFFFFF", backgroundColor: "#40444A", padding: "20px", marginLeft: "20px"}}>
                    <AddIcon fontSize="inherit"/>
                </IconButton>
            )
        }
    }

    function ToppingButton(){
        if (user.role == 'Admin' && title == 'Pizzák'){
            return (
                <Button size="large" onClick={() => navigate('/Feltetek')} sx={{color: "#FFFFFF", backgroundColor: "#40444A", padding: "20px", marginLeft: "20px", borderRadius: "20px"}}>
                   <Typography>
                    Feltétek
                   </Typography>
                </Button>
            )
        }
    }


    return(
        <Container disableGutters maxWidth={false} sx={{marginTop: '2rem'}}>
            <Loading loading={loading} />
            <Container maxWidth={false}>
                <Container disableGutters maxWidth={false} sx={{display: "flex", alignItems: "center"}}>
                    <Typography variant='h1'>
                        {title}
                    </Typography>
                    <Container disableGutters maxWidth={false} sx={{display: "flex", justifyContent: "end"}}>
                        <AddButton/>
                        <ToppingButton/>
                    </Container>
                </Container>
                <Container maxWidth={false}>
                    {title !== 'Italok' ? title !== 'Pizzák' ? <FilterButtons setUrl={setUrl} url={urlProp} filter="Restriction"/> : 
                    <PizzaFilterButtons setUrl={setUrl} url={urlProp} />  :
                        null}
                    <Grid container spacing={{xs: 1, sm: 2, md: 4}} >
                        {items.map((item) => {
                            return <MyCard item={item} key={item.id}/>
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