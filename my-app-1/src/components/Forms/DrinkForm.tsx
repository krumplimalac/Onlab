import { Box, Button, Container, TextField, Typography, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from '../Loading';
import SnackBar from '../SnackBar';
import { useParams } from "react-router-dom";

interface item {
  name: string,
  description: string,
  price: number,
  type: string,
  image: string
}

const initialDrink = {
  name: "",
  description: "",
  price: 0,
  type: "",
  image: ""
}

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
    const [drink, setDrink] = useState<item>(initialDrink);
    const params = useParams();

    const postDrink = async (data:FormData) => {
      setLoading(true);
      let response = await axios.post(`/api/Drink`, data)
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
    }

    const putDrink = async (data:FormData) => {
      setLoading(true);
      let response = await axios.put(`/api/Drink/${params.id}`, data)
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
      setLoading(false);
    }

    const getDrink = async () => {
      setLoading(true);
      let response = await axios.get(`/api/Drink/${params.id}`)
      .catch((error) => {
        console.log(error);
      })
      .then(res => {
        if(res != undefined)
        setDrink(res.data);
      });
      setLoading(false);
    } 

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        params.id != undefined? putDrink(data) : postDrink(data);
      };

    const handleChange = (event: SelectChangeEvent) => {
        if( drink != undefined){
          setDrink({...drink,["type"]: event.target.value});
        }
    };

      useEffect(() =>{
        if(params.id != undefined){
          getDrink();
        } else {
          setDrink(initialDrink)
        }
      },[]);

    return (
        <Container
          maxWidth={false}
          sx={{backgroundColor: "#30343A",
              paddingTop: '4rem',
              paddingBottom:'4rem',
              maxWidth: "800px"}}>
            { loading ? <Loading/> : null }
            <SnackBar text={errorMessage} error={error} isOpen={openErr} setIsOpen={setOpenErr} />
            <Typography variant="h3" align="center" margin="normal" marginBottom="10px">
            {params.id == undefined ? "Új ital" : "Szerkesztés" }
            </Typography>
            <form id="new_drink_form" onSubmit={(e) => {setLoading(true); handleSubmit(e)}}>
                <Select
                required
                fullWidth
                name="type"
                label={params.id == undefined ? "Típus" : ""}
                id="type"
                value={drink.type}
                onChange={handleChange}
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                >
                  {
                    types.map((option) => (
                      <MenuItem key={option.value} value={option.value} >
                        {option.label}
                      </MenuItem>
                      ))
                  }
                </Select>
                <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label={params.id == undefined ? "Név" : ""}
                id="name"
                value={drink.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if(drink != undefined){
                    setDrink({...drink,["name"]:event.target.value})}
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
                value={drink?.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if(drink != undefined){
                    setDrink({...drink,["description"]:event.target.value})}
                  }}
                sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label={params.id == undefined ? "Ár" : ""}
                id="price"
                type="number"
                value={drink?.price == 0 ? NaN : drink?.price}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if(drink != undefined){
                    setDrink({...drink,["price"]:Number(event.target.value)})}
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