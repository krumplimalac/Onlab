import MyCards from "../components/MealCards";
import { useState, useEffect } from 'react';
import axios, { AxiosHeaders } from 'axios';
import { Container, Pagination, Typography, styled } from "@mui/material";
import MealFilterButtons from "../components/MealFilterButtons";

interface paginationHeader {
    TotalCount: number,
    PageSize: number,
    CurrentPage: number,
    TotalPages: number,
    HasNext: boolean,
    HasPrevious: boolean
}

export default function Etelek(){
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [meals, setMeals] = useState([]);
    const [url, setUrl] = useState(`/api/Meals?`)
    const StyledPagination = styled(Pagination)(({ theme }) => ({
        "& .MuiPaginationItem-root": {
            color: "#FFFFFF"
        }
    }));

    const fetchMeals = async (page:number) => {
        try {
            const response = await axios.get(url+`&PageNumber=${page}&PageSize=6`);
            let res = response.data;
            const headers = response.headers;
            if (headers instanceof AxiosHeaders && headers.has('x-pagination')) {
                let header: paginationHeader = JSON.parse(headers['x-pagination']);
                setTotalPages(header.TotalPages);
            }
            setMeals(res);
            } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMeals(currentPage);
    }, [currentPage]);
    
    useEffect(() => {
        fetchMeals(currentPage);
    }, [url]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };


    return(
        <>
            <Typography variant="h2" sx={{marginLeft:"10%", marginTop:"2rem", typography: {xs: "h3", md: "h2", lg: "h1"}}}>
                Ételek
            </Typography>
            <Container maxWidth={false} sx={{maxWidth: "1400px"}}>
                <MealFilterButtons setUrl={setUrl}></MealFilterButtons>
                <MyCards items={meals} />
            </Container>     
            <StyledPagination sx={{display: "flex", justifyContent: "center", backgroundColor: "#343444", height: "80px", marginTop: "2rem"}}  size={"large"} count={totalPages} page={currentPage} onChange={handleChange}/>
        </>
    )
}