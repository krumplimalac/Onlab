import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import NewsCard from "../components/NewsCard";

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
    image: string
}

export default function Hirek(){
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [news, setNews] = useState<NewsProp[]>([]);
    const [url, setUrl] = useState(`/api/News?`)

    const fetchNews = async (page:number) => {
        try {
            const response = await axios.get(url+`&PageNumber=${page}&PageSize=6`);
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
        <Container maxWidth={false}>
            <Typography variant='h1'> Hírek </Typography>
            <Container>
            {news.map((item) => {
                return <NewsCard item={item}/>
            })}
            </Container>
        </Container>
    )
}