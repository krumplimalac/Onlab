import { Box, Button, Container, Paper, Slide, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function NewsForm(){
const [open, setOpen] = useState(false);

const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let currentTime = new Date;
    data.append('date',currentTime.toDateString());
    axios.post('/api/News', data)
              .then(res => {
                if(res.status = 201){
                  setOpen(true);  
                }
                console.log(res);
                console.log(res.data);
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