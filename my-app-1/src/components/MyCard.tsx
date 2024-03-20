import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

interface restriction {
    id: number,
    name: string
}

interface image {
    bytes: string
}

interface myProp {
    name: string,
    description: string,
    id: number,
    price: number,
    restrictions: restriction[],
    image: image
}

export const Restrictions = ({item}:{item:myProp}) => {
    if ( item.restrictions == undefined ) {
        return;
    } else {
        return(
            item.restrictions.map((r:restriction)=>(
             r.name == undefined ? "" : r.name+" "
            ))
    )
    }
}

export default function MyCard({item}:{item:myProp | undefined}){
    if ( item != undefined){
        let img = item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image.bytes}`; 

        return( 
            <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <Link to={`${item.id}`}>
                        <Card key={item.id} sx={{backgroundColor: '#30343A',maxWidth: '1600',borderRadius: "10px",marginTop: "2rem", height: "420px"}}>
                            <CardMedia 
                                component = 'img'
                                height='300'
                                image={img}
                            ></CardMedia>
                            <CardContent>
                                <Container disableGutters sx={{display: 'flex', justifyContent: "space-between"}}>
                                    <Typography variant='h4' component='div' sx={{color: 'white'}}>
                                        {item.name}   
                                    </Typography>
                                    <Typography variant='h5' component='div' sx={{color: 'white',backgroundColor:'#20242A',borderRadius: "15px", padding: "4px"}}>
                                        Ár: {item.price}   
                                    </Typography>
                                </Container>
                                <Typography sx={{color: 'white'}}><Restrictions item={item}/></Typography>
                            </CardContent>
                    </Card>
                </Link>              
            </Grid>
        
        )
    }
}