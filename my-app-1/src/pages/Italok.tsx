import { Container, Grid, Pagination, styled } from "@mui/material";
import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import MyCard from "../components/MyCard";

interface image {
    bytes: string
  }

interface DrinkProp {
    id: number,
    name: string,
    description: string,
    price:number,
    image: image
}

interface paginationHeader {
    TotalCount: number,
    PageSize: number,
    CurrentPage: number,
    TotalPages: number,
    HasNext: boolean,
    HasPrevious: boolean
}

export default function Italok(){
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [drinks, setDrinks] = useState<DrinkProp[]>([]);
const [url, setUrl] = useState(`/api/Drink?`);
const StyledPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
        color: "#FFFFFF"
    }
}));

const fetchNews = async (page:number) => {
    try {
        const response = await axios.get(url+`&PageNumber=${page}&PageSize=6`);
        const headers = response.headers;
        if (headers instanceof AxiosHeaders && headers.has('x-pagination')) {
            let header: paginationHeader = JSON.parse(headers['x-pagination']);
            setTotalPages(header.TotalPages);
        }
        setDrinks(response.data);
        } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    fetchNews(currentPage);
}, [currentPage]);

useEffect(() => {
    fetchNews(currentPage);
}, [url]);

const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
};

    return(
        <>
            <h1>
                Italok
            </h1>
            <Container>
                <Grid container spacing={{xs: 1, sm: 2, md: 4}} >
                    {drinks.map((item) => {
                        return <MyCard item={item}/>
                    })}
                </Grid>
            </Container>
            <StyledPagination
             sx={{
                display: "flex",
                justifyContent: "center", 
                backgroundColor: "#343444", 
                height: "80px", 
                marginTop: "2rem"}}  
            size={"large"} 
            count={totalPages} 
            page={currentPage} 
            onChange={handleChange}/>
        </>
    )
}