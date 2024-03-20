import {Grid} from '@mui/material'
import MyCard from './MyCard';

interface restriction {
    id: number,
    name: string
}

interface image {
  bytes: string
}

interface food {
    name: string,
    description: string,
    id: number,
    price: number,
    restrictions: restriction[],
    image: image
}


export default function MyCards({items} : {items: food[]} ) {
    return(
            <Grid container spacing={{xs: 4}} >
              {items.map((item) => (
                <MyCard item={item}/>         
              ))}  
            </Grid>
        )}