import { CardMedia, Box, Typography, Card } from "@mui/material" 
import { Link } from "react-router-dom"

interface Props {
    img: string, link: string, text: string
}

export default function HomeNav(props: Props){
    return (
        <Box sx={{position: 'relative'}}> 
                <Card sx={{'&:hover': {'&:hover > img': {height: '550px'}}}}>
                <CardMedia 
                    component='img'
                    height='400'
                    image={props.img}
                    alt="Kép"
                    sx={{transition: '0.5s'}}
                />
                <Link to={props.link}>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            padding: '20px',
                            transition: '0.5s',
                            '&:hover': {background: 'rgba(0, 0, 0, 0.8)', padding: '50px'}
                            }}>
                        <Typography variant="h3" sx={{transition: '0.5s','&:hover': {color: '#B0B0B0'}}}>
                            {props.text}
                        </Typography>
                    </Box>
                </Link>
                </Card>
            </Box>
    )
}