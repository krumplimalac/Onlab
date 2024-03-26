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
        <Card>
            <CardMedia
            component="img"
            height="400px"
            image={img} />
            <CardContent>
                <Typography>
                    {item.title}
                </Typography>
            </CardContent>
            <CardActions></CardActions>
        </Card>
    )
}