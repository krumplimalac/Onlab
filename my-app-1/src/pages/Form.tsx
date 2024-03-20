import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";

interface MyProp{
    id: number,
    name: string,
    description: string,
    restrictions: string,
    price: number,
    file: FormData
};

export default function MealForm() {
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("restrictions","nincs");
        
        axios.post(`/api/Meals`, data)
          .then(res => {
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

            <form onSubmit={handleSubmit}>
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