import { Container, Grid, Pagination, Typography, styled } from "@mui/material";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import MyCard from "../components/MyCard";
import FilterButtons from "./FilterButtons";
import Loading from "./Loading";
import PizzaFilterButtons from "./PizzaFilterButtons";

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

export default function Italok({urlProp,title}:{urlProp:string, title:string}){
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [items, setItems] = useState<myProp[]>([]);
const [url, setUrl] = useState(urlProp);
const [loading, setLoading] = useState(true);
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

    return(
        <Container disableGutters maxWidth={false} sx={{marginTop: '2rem'}}>
            <Loading loading={loading} />
            <Container maxWidth={false}>
                <Typography variant='h1'>
                    {title}
                </Typography>
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