import {Grid} from '@mui/material'
import MyCard from './MyCard';

interface image {
  bytes: string
}

interface myProp {
  name: string,
  description: string,
  id: number,
  price: number,
  type: string,
  image: image
}


export default function MyCards({items} : {items: myProp[]} ) {
    return(
            <Grid container spacing={{xs: 1, sm: 2, md: 4}} >
              {items.map((item) => (
                <MyCard item={item} key={item.id}/>         
              ))}  
            </Grid>
        )}