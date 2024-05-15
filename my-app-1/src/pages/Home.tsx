import { Container, CardMedia } from "@mui/material"
import '../CSS/main.css'
import HomeNav from "../components/HomeNav"
import { useContext } from "react"
import { UserContext } from "../App"
import { ThemeContext } from "@emotion/react"
import HomeNews from "../components/HomeNews"

let etel = {
    img : '/src/img/foods.jpg',
    link : '/Etelek',
    text : 'Ételek'
}

let pizza = {
    img : '/src/img/pizzas.jpg',
    link : '/Pizzak',
    text : 'Pizzák'
}

let ital = {
    img : '/src/img/drinks.jpg',
    link : '/Italok',
    text : 'Italok'
}

export default function Home(){   
    const user = useContext(UserContext);

    return (
        <Container disableGutters maxWidth={false} >
            <CardMedia 
            component='img'
            height='400'
            image="/src/img/coffeeshop.jpg"
            alt="Kép"
            sx={{'&:hover': {height: '550px'},transition: '0.5s'}}/> 
            <Container maxWidth={false} className='myclass' sx={{display: 'grid'}}>
                <h1>Üdvözlünk {user.email}! {user.role !== "" ? `role:${user.role}` : ""}</h1>
                
            </Container>
            
            <HomeNav {...etel}/>
            <HomeNav {...pizza}/>
            <HomeNav {...ital}/>

        </Container>
        
    )
}