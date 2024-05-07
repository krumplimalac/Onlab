import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import Loading from "../Loading";
import SnackBar from "../SnackBar";


export default function NewsForm(){
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let currentTime = new Date;
    setLoading(true);
    data.append('date',currentTime.toDateString());
    console.log(data.get("file"));
    axios.post('/api/News', data)
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
    setLoading(false);  
  };

    return (
        <Container
          maxWidth={false}
          sx={{backgroundColor: "#30343A",
              paddingTop: '4rem',
              paddingBottom:'4rem',
              maxWidth: "800px"}}>
            <Loading loading={loading} />
            <SnackBar text={errorMessage} error={error} isOpen={openErr} setIsOpen={setOpenErr} />
            <Typography variant="h3" align="center" margin="normal">Új hír</Typography>
            <form id="new_news_form" onSubmit={handleSubmit}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="title"
                label="Cím"
                id="title"
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Szöveg"
                id="description"
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