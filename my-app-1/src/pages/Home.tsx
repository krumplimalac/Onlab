import { Container, CardMedia } from "@mui/material"
import '../CSS/main.css'
import HomeNav from "../components/HomeNav"

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
    
    return (
        <Container disableGutters maxWidth={false}  >
            <CardMedia 
            component='img'
            height='400'
            image="/src/img/coffeeshop.jpg"
            alt="Kép"
            sx={{'&:hover': {height: '550px'},transition: '0.5s'}}/> 
            <Container maxWidth={false} className='myclass' sx={{display: 'grid'}}>
                <h1>Üdvözlünk!</h1>
                
            </Container>
            
            <HomeNav {...etel}/>
            <HomeNav {...pizza}/>
            <HomeNav {...ital}/>

        </Container>
        
    )
}