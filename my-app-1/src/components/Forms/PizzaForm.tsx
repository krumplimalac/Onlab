import { Box, Button, Container, FormControlLabel, FormGroup, Checkbox, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from '../Loading';
import SnackBar from '../SnackBar';

interface Topping {
  id: number,
  name: string
};

export default function PizzaForm() {
    const [ids, setIds] = useState<number[]>([]);
    const [openErr, setOpenErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);
    const [toppings, setToppings] = useState<Topping[]>([]);

    const handleToppingButtonClick = (selected:number) => {
      if ( ids.includes(selected) ) {
          let tmp = ids.filter((v) => v !== selected);
          setIds(tmp);
      } else {
          setIds([...ids,selected]);
      }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        data.append('toppings',JSON.stringify(ids));
        console.log(data);
        axios.post(`/api/Pizza`, data)
              .catch((e: AxiosError) => {
                console.log(e);
                setError(true);
                setErrorMessage("Sikertelen pizzafelvétel! Error: "+e.code)
                setOpenErr(true);
              })
              .then(res => {
                if(res != undefined){
                  if(res.status = 201){
                    setError(false);
                    setErrorMessage("Sikeres pizzafelvétel!")
                    setOpenErr(true);
                  }else{
                    setError(true);
                    setErrorMessage("Sikertelen pizzafelvétel!")
                    setOpenErr(true);
                  }
                }
              })
        setLoading(false);
    };

    const getToppings = async () => {
      try {
        const data = await axios.get('api/Topping');
        data != undefined ? setToppings(data.data) : {};
      } catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
      getToppings();
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
            <Typography variant="h3" align="center" margin="normal">Új pizza</Typography>
            <FormGroup id="Topping_checks" row sx={{display: "flex", justifyContent: "space-around"}}>
                {
                  toppings.map((topping) => {
                    return(
                      <FormControlLabel
                      control={
                        <Checkbox checked={ids.includes(topping.id)} onChange={() => handleToppingButtonClick(topping.id)} name={topping.name} key={topping.id} />
                      }
                      label={topping.name}
                      key={topping.id}
                      />
                    )
                  })
                }
            </FormGroup>
              <form id="new_pizza_form" onSubmit={handleSubmit}>
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