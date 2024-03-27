import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, FormControlLabel, FormGroup, Checkbox, TextField, Typography, Paper, Snackbar, Slide } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function MealForm() {
    const [state, setState] = useState({
      glutenfree: false,
      vegan: false,
      vegetarian: false,
      lactosefree: false,
    });
    const [open, setOpen] = useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let restrictionNames = [] as string[]
        if (state.glutenfree) restrictionNames.push("Gluténmentes")
        if (state.vegan) restrictionNames.push("Vegán")
        if (state.vegetarian) restrictionNames.push("Vegetáriánus")
        if (state.lactosefree) restrictionNames.push("Laktózmentes")
        const restrictions = JSON.stringify(restrictionNames);
        data.append("restrictions",restrictions);
        axios.post(`/api/Meals`, data)
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
            <Typography variant="h3" align="center" margin="normal">Új étel</Typography>
            
              <FormGroup id="rest_checks" row sx={{display: "flex", justifyContent: "space-around"}}>
                <FormControlLabel
                  control={
                    <Checkbox checked={state.glutenfree} onChange={handleChange} name="glutenfree" />
                  }
                  label="Gluténmentes"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={state.vegetarian} onChange={handleChange} name="vegetarian" />
                  }
                  label="Vegetáriánus"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={state.vegan} onChange={handleChange} name="vegan" />
                  }
                  label="Vegán"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={state.lactosefree} onChange={handleChange} name="lactosefree" />
                  }
                  label="Laktózmentes"
                />
              </FormGroup>
              <form id="new_meal_form" onSubmit={handleSubmit}>
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
                    id="formfile"
                    name="formfile"
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