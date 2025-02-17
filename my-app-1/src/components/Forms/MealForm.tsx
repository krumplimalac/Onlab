import { Box, Button, Container, FormControlLabel, FormGroup, Checkbox, TextField, Typography } from "@mui/material";
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

export default function MealForm() {
    const [state, setState] = useState({
      glutenfree: false,
      vegan: false,
      vegetarian: false,
      lactosefree: false,
    });
    const [openErr, setOpenErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);
    const [meal, setMeal] = useState<item>();
    const [ok, setOk] = useState(false);
    const params = useParams();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };

    const getItem = async (id:number) => {
      setLoading(true);
      try {
          const response = await axios.get(`/api/Meal/${id}`);
          if ( response.data != undefined){
            setMeal(response.data);
            setOk(!ok);
          }
      } catch (error) {
          console.log(error);
      }
      setLoading(false);
    };

    const postItem = async (data:FormData) => {
      setLoading(true);
      try {
        const response = await axios.post(`/api/Meal`, data)
        .catch((e: AxiosError) => {
          console.log(e);
          setError(true);
          setErrorMessage("Sikertelen ételfelvétel! Error: "+e.code)
          setOpenErr(true);
        })
        .then(res => {
          if(res != undefined){
            if(res.status = 201){
              setError(false);
              setErrorMessage("Sikeres ételfelvétel!")
              setOpenErr(true);
            }else{
              setError(true);
              setErrorMessage("Sikertelen ételfelvétel!")
              setOpenErr(true);
            }
          }
        });
        console.log(response);
      } catch (error) {
          console.log(error);
      }
      setLoading(false);
    };

    const putItem = async (data:FormData) => {
      setLoading(true);
      try {
        data.append("id",String(params.id));
        const response = await axios.put(`/api/Meal/${params.id}`, data)
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
        });
        console.log(response);
      } catch (error) {
          console.log(error);
      }
      setLoading(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let restrictionNames = [] as string[]
        if (state.glutenfree) restrictionNames.push("Gluténmentes");
        if (state.vegan) restrictionNames.push("Vegán");
        if (state.vegetarian) restrictionNames.push("Vegetáriánus");
        if (state.lactosefree) restrictionNames.push("Laktózmentes");
        const restrictions = JSON.stringify(restrictionNames);
        data.append("restrictions",restrictions);
        params.id != undefined ? putItem(data) : postItem(data);       
    };

    useEffect(() => {
      if(params.id !== undefined){
        getItem(Number(params.id));
      }else{
        setMeal({
          name: "",
          description: "",
          price: 0,
          type: "",
          image: ""
        })
      }
    },[]);

    useEffect(() => {
      if(meal != undefined){
        const restrictions = meal.type.split(" ");
        let tmp = {
          glutenfree: false,
          vegan: false,
          vegetarian: false,
          lactosefree: false,
        };
        if (restrictions.includes('Gluténmentes')) tmp.glutenfree = true;
        console.log(state);
        if (restrictions.includes('Vegetáriánus')) tmp.vegetarian = true;
        console.log(state);
        if (restrictions.includes('Vegán')) tmp.vegan = true;
        console.log(state);
        if (restrictions.includes('Laktózmentes')) tmp.lactosefree = true;
        console.log(state);
        setState(tmp);
      };
    },[ok]);

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
              {params.id == undefined ? "Új étel" : "Szerkesztés" }
            </Typography>
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
            <form id="new_meal_form" onSubmit={(e) => {setLoading(true); handleSubmit(e)}}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label={params.id == undefined ? "Név" : ""}
                id="name"
                value={meal?.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (meal != undefined)
                  setMeal({...meal,["name"]:event.target.value});
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
                value={meal?.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (meal != undefined)
                  setMeal({...meal,["description"]:event.target.value});
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
                value={meal?.price == 0 ? NaN : meal?.price}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (meal != undefined )
                  setMeal({...meal,["price"]:event.target.valueAsNumber});
                }}
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
                <Button type="submit" sx={{backgroundColor: "#252530", borderRadius: "20px", marginTop: "1rem", padding: "1rem"}}>
                    {params.id != undefined ? "Mentés" : "Feltöltés"}
                </Button>
          </form>
        </Container>
    )
}