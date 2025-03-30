import axios, { AxiosHeaders } from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, IconButton, Pagination, Typography, styled } from "@mui/material";
import NewsCard from "../components/NewsCard";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

interface paginationHeader {
    TotalCount: number,
    PageSize: number,
    CurrentPage: number,
    TotalPages: number,
    HasNext: boolean,
    HasPrevious: boolean
}

interface NewsProp {
    title: string,
    description: string,
    date:string,
    id: number,
    image: string
}

export default function Hirek(){
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [news, setNews] = useState<NewsProp[]>([]);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const url = `/api/News?`;
    const StyledPagination = styled(Pagination)(({ theme }) => ({
        "& .MuiPaginationItem-root": {
            color: "#FFFFFF"
        }
    }));

    const fetchNews = async (page:number) => {
        try {
            const response = await axios.get(url+`&PageNumber=${page}&PageSize=3`);
            const headers = response.headers;
            if (headers instanceof AxiosHeaders && headers.has('x-pagination')) {
                let header: paginationHeader = JSON.parse(headers['x-pagination']);
                setTotalPages(header.TotalPages);
            }
            setNews(response.data);
            } catch (error) {
            console.log(error);
        }
    };

    function AddButton(){
        if (user.role == 'Admin'){
            return (
                <IconButton size="large" onClick={() => navigate('/Ujhir')} sx={{color: "#FFFFFF", backgroundColor: "#40444A", padding: "20px", marginLeft: "20px"}}>
                    <AddIcon fontSize="inherit"/>
                </IconButton>
            )
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    return(
        <Container maxWidth={false} disableGutters sx={{minHeight: '780px'}}>
            <Container maxWidth={false}>
                <Container disableGutters maxWidth={false} sx={{display: "flex", alignItems: "center"}}>
                    <Typography variant='h1'>
                        Hírek
                    </Typography>
                    <Container disableGutters maxWidth={false} sx={{display: "flex", justifyContent: "end"}}>
                        <AddButton/>  
                    </Container>
                </Container>
                <Container>
                {news.map((item) => {
                    return <NewsCard key={item.id} item={item}/>
                })}
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