import { Card, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@mui/material"
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
        const img = item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image.bytes}`; 

        return( 
            <Grid item xs={12} md={6} lg={4} key={item.id}>
                    <Link to={`${item.id}`}>
                        <Card component={Paper} elevation={20} key={item.id} sx={{transition: "0.5s", backgroundColor: '#30343A',maxWidth: '1600',borderRadius: "10px",marginTop: "2rem", height: "440px",":hover":{borderRadius: "30px", boxShadow:"5px 5px 50px",backgroundColor: '#40444A'}}}>
                            <CardMedia 
                                component = 'img'
                                height='300'
                                image={img}
                            ></CardMedia>
                            <CardContent>
                                <Container disableGutters sx={{display: 'flex', justifyContent: "space-between"}}>
                                    <Typography variant='h5' component='div' sx={{color: 'white'}}>
                                        {item.name}   
                                    </Typography>
                                    <Typography variant='h6' component='div' sx={{color: 'white',backgroundColor:'#20242A',borderRadius: "15px", padding: "4px"}}>
                                        {item.price} Ft   
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