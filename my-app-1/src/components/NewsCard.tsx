import { CardActions, CardContent, CardMedia } from "@mui/material";

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
            <CardMedia />
            <CardContent>

            </CardContent>
            <CardActions></CardActions>
        </Card>
    )
}