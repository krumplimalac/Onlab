import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import SnackBar from "../SnackBar";
import { useParams } from "react-router-dom";

interface newsInterface {
  title: string,
  description: string,
  date: string,
}

export default function NewsForm(){
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<newsInterface>();
  const params = useParams();

  const postNews = async (data:FormData) => {
    let response = await axios.post('/api/News', data)
      .catch((e: AxiosError) => {
        console.log(e);
        setError(true);
        setErrorMessage("Sikertelen hírfelvétel! Error: "+e.code)
        setOpenErr(true);
      })
      .then(res => {
        if(res != undefined){
          if(res.status = 201){
            setError(false);
            setErrorMessage("Sikeres hírfelvétel!")
            setOpenErr(true);
          }else{
            setError(true);
            setErrorMessage("Sikertelen hírfelvétel!")
            setOpenErr(true);
          }
        }
      })
  }

  const putNews = async (data:FormData) => {
    let response = await axios.put(`/api/News/${params.id}`, data)
      .catch((e: AxiosError) => {
        console.log(e);
        setError(true);
        setErrorMessage("Sikertelen szerkesztés! Error: "+e.code)
        setOpenErr(true);
      })
      .then(res => {
        if(res != undefined){
          if(res.status = 201){
            setError(false);
            setErrorMessage("Sikeres szerkesztés!")
            setOpenErr(true);
          }else{
            setError(true);
            setErrorMessage("Sikertelen szerkesztés!")
            setOpenErr(true);
          }
        }
      })
  }

  const getNews = async () => {
    let response = await axios.get(`/api/News/${params.id}`)
    .catch((error) => {
      console.log(error);
    })
    .then(res => {
      if(res != undefined){
      setNews(res.data);
      }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let currentTime = new Date;
    params.id == undefined ? data.append('date',currentTime.toDateString()) : news != undefined ? data.append('date',news.date) : {} ;
    console.log(data);
    params.id == undefined ? postNews(data) : putNews(data);
    setLoading(false);  
  };

  useEffect(() =>{
    if(params.id != undefined){
      getNews();
    }else{
      setNews({
        title: "",
        description: "",
        date: ""
      })
    }
      
    setLoading(false);
  },[]);

    return (
        <Container
          maxWidth={false}
          sx={{backgroundColor: "#30343A",
              paddingTop: '4rem',
              paddingBottom:'4rem',
              maxWidth: "800px"}}>
            <Loading loading={loading} />
            <SnackBar text={errorMessage} error={error} isOpen={openErr} setIsOpen={setOpenErr} />
            <Typography variant="h3" align="center" margin="normal" marginBottom="10px">
              {params.id == undefined ? "Új hír" : "Szerkesztés" }
            </Typography>
            <form id="new_news_form" onSubmit={(e) => {setLoading(true); handleSubmit(e)}}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="title"
                label={params.id == undefined ? "Cím" : ""}
                id="title"
                value={news?.title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if(news != undefined){
                    setNews({...news,["title"]:event.target.value})}
                  }}
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label={params.id == undefined ? "Leírás" : ""}
                id="description"
                value={news?.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if(news != undefined){
                    setNews({...news,["description"]:event.target.value})}
                  }}
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
                <Box sx={{borderRadius: "20px", backgroundColor: "#252530", padding: "1rem", marginTop: "10px"}}>
                    <input 
                    id="file"
                    name="file"
                    type="file"
                    accept=".jpg"
                    />
                </Box>
                <Button type="submit">
                    Feltöltés
                </Button>
            </form>
        </Container>
    )
}