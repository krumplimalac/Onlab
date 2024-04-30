import { Container, Grid, Pagination, Typography, styled } from "@mui/material";
import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import MyCard from "../components/MyCard";
import FilterButtons from "./RestrictionFilterButtons";
import Loading from "./Loading";

interface image {
    bytes: string
  }

  interface myProp {
    name: string,
    description: string,
    id: number,
    price: number,
    type: string,
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
        console.log(error);
    }
};

useEffect(() => {
    setLoading(true);
    fetchItems(currentPage);
    setLoading(false)
    console.log(url);
}, [currentPage, url]);

const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
};

    return(
        <Container maxWidth={false} sx={{marginTop: '2rem'}}>
            <Loading loading={loading} />
            <Typography variant='h1'>
                {title}
            </Typography>
            <Container disableGutters maxWidth={false}>
                {title !== 'Italok' ? title !== 'Pizzák' ? <FilterButtons setUrl={setUrl} url={urlProp} filter="Restriction"/> : 
                <Container>
                    <FilterButtons setUrl={setUrl} url={urlProp} filter="Restriction"/>
                    <FilterButtons setUrl={setUrl} url={urlProp} filter="Topping"/>
                    </ Container>  :
                     null}
                <Grid container spacing={{xs: 1, sm: 2, md: 4}} >
                    {items.map((item) => {
                        return <MyCard item={item} key={item.id}/>
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
        </Container>
    )
}