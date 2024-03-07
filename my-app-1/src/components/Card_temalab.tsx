import {Card, CardContent, Typography, CardActions, Button, CardMedia, Container, Collapse, Grid} from '@mui/material'
import { useState } from 'react'

interface food {
    name: string,
    description: string,
    id: number,
    price: number
}

export default function MyCard({items} : {items: food[]} ) {
    const [expandedId, setExpandedId] = useState(-1);
    const handleExpandClick = (i:number) => {
        setExpandedId(expandedId === i ? -1 : i);
      };

    return(
            <Grid container spacing={{xs: 4}}>
              {items.map((item , i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Card key={item.id} sx={{backgroundColor: '#30343A',maxWidth: '1400',borderRadius: "10px",marginTop: "2rem"}}>
                        {/**<CardMedia 
                            component = 'img'
                            height='300'
                            image={item.img}
                        />*/}
                        <CardContent>
                            <Container sx={{display: 'flex', justifyContent: "space-between"}}>
                                <Typography gutterBottom variant='h4' component='div' sx={{color: 'white'}}>
                                    {item.name}   
                                </Typography>
                                <Typography gutterBottom variant='h5' component='div' sx={{color: 'white'}}>
                                    Ár: {item.price}   
                                </Typography>
                            </Container>
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