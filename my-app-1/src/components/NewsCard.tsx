import { Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";

interface newsProp {
    title: string,
    description: string,
    date:string,
    id:number
    image: string
}

export default function NewsCard({item}:{item:newsProp}){
    const img = item.image.length == 0 || item.image == undefined ? "/src/img/img.jpg" : `data:image/jpg;base64,${item.image}`;
    return(
        <Container key={item.id} maxWidth={false} sx={{maxWidth: '1500px'}}>
            <Card key={item.id} sx={{backgroundColor: '#30343A', borderRadius: '20px'}}>
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
            </Card>
        </Container>
        )
}