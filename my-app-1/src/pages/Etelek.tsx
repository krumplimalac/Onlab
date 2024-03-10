import MyCard from "../components/Card_temalab";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Pagination, Typography } from "@mui/material";

export default function Etelek(){

    const [menu, setMenu] = useState([]);
   
    const client = axios.create({
        baseURL: '/api' 
    });

    useEffect(() => {
        const fetchMenu = async () => {
            let response = await client.get(url);
            setMenu(response.data)
        };
        fetchMenu();
     }, []);
    }

    const [page, setPage] = useState(1);;
    let PageSize : number;
    let MaxPage = 10;
    const [url, setUrl] = useState(`/Meals`)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setUrl(`/Meals?PageNumber=${page}`);
    };


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [meals, setMeals] = useState([]);

    const fetchMeals = async (page) => {
        try {
        const response = await axios.get(`/api/Meals?page=${page}&pageSize=10`);
        const { meals, totalPages } = response.data;
        setMeals(meals);
        setTotalPages(totalPages);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        fetchMeals(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage- 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };


    return(
        <>
            <Typography variant="h2" sx={{marginLeft:"10%", marginTop:"2rem", typography: {xs: "h3", md: "h2", lg: "h1"}}}>
                Ételek
            </Typography>
            <Container sx={{maxWidth: "1600"}}>
                <MyCard items={menu} />
                <Pagination count={MaxPage} page={page} onChange={handleChange} />
            </Container>
           
        </>
    )
}