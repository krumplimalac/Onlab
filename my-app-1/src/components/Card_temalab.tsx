import {Card, CardContent, Typography, CardActions, Button, CardMedia, Container, Collapse, Grid} from '@mui/material'
import { useState } from 'react'

interface restriction {
    id: number,
    name: string
}

interface food {
    name: string,
    description: string,
    id: number,
    price: number,
    restrictions: restriction[]
}

export default function MyCard({items} : {items: food[]} ) {
    const [expandedId, setExpandedId] = useState(-1);
    const handleExpandClick = (i:number) => {
        setExpandedId(expandedId === i ? -1 : i);
      };

    return(
            <Grid container spacing={{xs: 4}}>
              {items.map((item , i) => (
                    <Grid item xs={12} md={6} lg={4} key={i}>
                        <Card key={item.id} sx={{backgroundColor: '#30343A',maxWidth: '1600',borderRadius: "10px",marginTop: "2rem"}}>
                            <CardMedia 
                                component = 'img'
                                height='300'
                                image='/src/img/img.jpg'
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
                                <Typography>{item.restrictions[0] == undefined ? "üres" : item.restrictions[0].name}</Typography>
                                <Typography variant='body2' color='inherit' sx={{color: 'white'}}>
                                    <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                                        <>
                                        {item.description}    
                                        </>
                                    </Collapse>       
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size='small' 
                                    onClick={() => handleExpandClick(i)}
                                    aria-expanded={expandedId === i} 
                                    sx={{borderRadius: '5px', color: 'white', backgroundColor: '#50545A'}}>
                                        Leírás
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>     
              ))}  
            </Grid>
       
        )}