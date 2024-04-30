import { Box, Button, Container, TextField, Typography, MenuItem } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import Loading from '../Loading';
import SnackBar from '../SnackBar';

export default function DrinkForm() {
    const types = [
      {
        value: 'Kávé',
        label: 'Kávé',
      },
      {
        value: 'Üdítő',
        label: 'Üdítő',
      },
      {
        value: 'Alkoholos ital',
        label: 'Alkoholos ital',
      },
      {
        value: 'Egyéb',
        label: 'Egyéb',
      },
    ];
    const [openErr, setOpenErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post(`/api/Drink`, data)
          .catch((e: AxiosError) => {
            console.log(e);
            setError(true);
            setErrorMessage("Sikertelen italfelvétel! Error: "+e.code)
            setOpenErr(true);
          })
          .then(res => {
            if(res != undefined){
              if(res.status = 201){
                setError(false);
                setErrorMessage("Sikeres italfelvétel!")
                setOpenErr(true);
              }else{
                setError(true);
                setErrorMessage("Sikertelen italfelvétel!")
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
            <Typography variant="h3" align="center" margin="normal">Új Ital</Typography>
            <form id="new_drink_form" onSubmit={handleSubmit}>
                <TextField
                select
                margin="normal"
                required
                fullWidth
                name="type"
                label="Típus"
                id="type"
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                >
                  {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                  ))}
                </TextField>
                <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Név"
                id="name"
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Leírás"
                id="description"
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Ár"
                id="price"
                type="number"
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