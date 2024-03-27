import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, TextField, Typography, Paper, Snackbar, Slide, MenuItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function DrinkForm() {
    const [open, setOpen] = useState(false);
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
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post(`/api/Drink`, data)
              .then(res => {
                if(res.status = 201){
                  setOpen(true);
                }
              })
            console.log({
              data
          });
      };

    return (
        <Container
          maxWidth={false}
          sx={{backgroundColor: "#30343A",
              paddingTop: '4rem',
              paddingBottom:'4rem',
              maxWidth: "800px"}}>
            <Snackbar
              open={open}
              onClose={handleClose}
              autoHideDuration={5000}
              TransitionComponent={Slide}
              anchorOrigin={{vertical: 'top',horizontal: 'center'}}
            >
              <Paper elevation={10} sx={{backgroundColor: "#10BB44",margin:'10px',padding:'15px',width: "300px", display: "flex", justifyContent:"space-between"}}>
              <Typography>Sikeres küldés!</Typography>
              <CheckCircleIcon/>
              </Paper>
            </Snackbar>
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