import { Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";

interface image {
    bytes: string
  }

interface newsProp {
    title: string,
    description: string,
    date:string,
    image: image
}

export default function NewsCard({item}:{item:newsProp}){
    const img = item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image.bytes}`; 
    console.log(item.image.bytes);
    return(
        <Container maxWidth={false} sx={{maxWidth: '1500px'}}>
            <Card key={item.title} sx={{backgroundColor: '#30343A'}}>
            <CardMedia
            component="img"
            height="400px"
            image={img} />
            <CardContent>
                <Typography variant="h3" sx={{color: 'white'}}>
                    {item.title}
                </Typography>
                <Typography sx={{color: 'white', textOverflow: "ellipsis",overflow: "clip",height: "20px"}}>
                    {item.description}
                </Typography>
                <Typography sx={{color: 'white'}}>
                    {item.date}
                </Typography>
            </CardContent>
            <CardActions></CardActions>
        </Card>
        </Container>
        )
}