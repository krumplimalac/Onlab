import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface image {
    bytes: string
  }

interface NewsProp {
    title: string,
    description: string,
    date:string,
    image: image
}

export default function NewsCards({item}:{item:NewsProp}){
    const img = item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image.bytes}`; 
    return(
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
    )
}