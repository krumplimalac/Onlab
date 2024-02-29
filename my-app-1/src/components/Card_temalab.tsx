import {Box, Card, CardContent, Typography, CardActions, Button, CardMedia, Container} from '@mui/material'

interface food {
    img: string,
    name: string,
    description: string,
    ingredients: string,
    id: number
}

export default function MyCard({items} : {items: food[]} ) {
    
    return(
            <Container>
              {items.map(item  => (
                <Container>
                    <Box >
                        <Card sx={{backgroundColor: '#30343A'}}>
                            <CardMedia 
                                component = 'img'
                                height='300'
                                image={item.img}
                                />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div' sx={{color: 'white'}}>
                                    {item.name}   
                                </Typography>
                                <Typography variant='body2' color='inherit' sx={{color: 'white'}}>
                                        {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size='small' sx={{borderRadius: '5px', color: 'white', backgroundColor: '#50545A'}}>MORE</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Container>  
              ))}  
            </Container>
       
        )}