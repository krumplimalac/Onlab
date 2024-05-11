import { Box, Button, Container, FormControlLabel, FormGroup, Checkbox, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from '../Loading';
import SnackBar from '../SnackBar';
import { useParams } from "react-router-dom";

interface Topping {
  id: number,
  name: string
}

interface item {
  name: string,
  description: string,
  price: number,
  type: string,
  image: string
}

export default function PizzaForm() {
    const [ids, setIds] = useState<number[]>([]);
    const [openErr, setOpenErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(true);
    const [toppings, setToppings] = useState<Topping[]>([]);
    const [pizza, setPizza] = useState<item>();
    const [ok, setOk] = useState(false);
    const params = useParams();

    const handleToppingButtonClick = (selected:number) => {
      if ( ids.includes(selected) ) {
          let tmp = ids.filter((v) => v !== selected);
          setIds(tmp);
      } else {
          setIds([...ids,selected]);
      }
    }

    const postPizza = async (data:FormData) => {
      let response = await axios.post(`/api/Pizza`, data)
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
    }

    const putPizza = async (data:FormData) => {
      let response = await axios.put(`/api/Pizza/${params.id}`, data)
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('toppings',JSON.stringify(ids));
        params.id != undefined ? putPizza(data) : postPizza(data);
        setLoading(false);
    };

    const getToppings = async () => {
      try {
        const data = await axios.get('/api/Topping');
        data != undefined ? setToppings(data.data) : setToppings([]);
      } catch (error) {
          console.log(error);
      }
    };

    const getPizza = async () => {
      try{
        if( params.id != undefined ){
          const response = await axios.get(`/api/Pizza/${params.id}`);
          response != undefined ? setPizza(response.data) : {};
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getToppings();
      if(params.id != undefined){
        getPizza();
        setOk(!ok);
      }else{
        setPizza({
          name: "",
          description: "",
          price: 0,
          type: "",
          image: ""
        })
      }
      setLoading(false);
    },[]);   

    useEffect(()=>{
      if(pizza != undefined){
        const pizzaToppings = pizza.type.split(" ");
        let tmpIds: number[] = [];
        pizzaToppings.map((t) => {
          toppings.map((topping) => {
            if(topping.name == t){
                tmpIds.push(topping.id);
            }
          });
        });
        setIds(tmpIds);
      };
    },[ok])

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
              {params.id == undefined ? "Új pizza" : "Szerkesztés" }
              </Typography>
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
              <form id="new_pizza_form" onSubmit={(e) => {setLoading(true); handleSubmit(e)}}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label={params.id == undefined ? "Név" : ""}
                id="name"
                value={pizza?.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (pizza != undefined)
                  setPizza({...pizza,["name"]:event.target.value});
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
                value={pizza?.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (pizza != undefined)
                  setPizza({...pizza,["description"]:event.target.value});
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
                value={pizza?.price == 0 ? NaN : pizza?.price}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (pizza != undefined)
                  setPizza({...pizza,["price"]:Number(event.target.value)});
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
                <Button type="submit">
                    Feltöltés
                </Button>
            </form>
        </Container>
    )
}