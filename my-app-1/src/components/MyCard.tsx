import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"

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

const Restrictions = ({item}:{item:myProp}) => {
    return(
            item.restrictions.map((r:restriction)=>(
             r.name == undefined ? "" : r.name+" "
            ))
    ) 
}

export default function MyCard({item}:{item:myProp}){
    let img: string;
    img = item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image.bytes}` 

    return(
        <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card key={item.id} sx={{backgroundColor: '#30343A',maxWidth: '1600',borderRadius: "10px",marginTop: "2rem"}}>
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
                <CardActions>
                    <Button 
                        size='small' 
                        onClick={() => {}}
                        sx={{borderRadius: '5px', color: 'white', backgroundColor: '#50545A'}}>
                        Részletek
                    </Button>
                </CardActions>
        </Card>              
    </Grid>
    )
}