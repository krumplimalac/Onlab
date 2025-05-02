import { Box, Button, Container, Typography } from "@mui/material"
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App";
import Loading from "../other/Loading";

interface reservation {
    reserver: string,
    id: string,
    tableId: number,
    startTime: string,
    endTime: string,
    numberOfPeople: number
}

export default function Foglalasaim(){
    const [reservations, setReservations] = useState<reservation[]>([]);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(UserContext);

    const fetch = async () => {
        setLoading(true);
        await axios.get(`api/Reservation/${user.id}`)
        .catch((e) => {
            console.log(e);
        })
        .then((res) => {
            if(res){
                setReservations(x => []);
                let response = res.data;
                response.map((r:reservation) => {
                    setReservations(prevReservations => [...prevReservations, r]);
                })
            }
        })
        setLoading(false);
    }

    const deleteReservation = async (id:string) => {
        setLoading(true);
        await axios.delete(`api/Reservation/${id}`)
        .catch((e) => {
            console.log(e);
        })
        .then((res) => {
            if(res){
                if(res.status == 200){
                    console.log("OK");
                }
            }
        })
        setLoading(false);
        fetch();
    }

    useEffect(() => {
        fetch();
    },[user]);

    return(
        <Container  sx={{marginTop: '1rem', backgroundColor: '#303030', minHeight: '780px'}}>
            {loading ? <Loading/> : null}
            <Typography variant='h3' align="center" paddingTop={2} paddingBottom={2}>Foglalásaim</Typography>
            <Container 
            sx={{
                marginY: 4, 
                paddingY: 4,
                backgroundColor: '#444444', 
                borderRadius: 4, 
                display: 'flex', 
                justifyContent:'center',
                alignContent:'center' ,
                alignItems: 'stretch', 
                flexDirection:'row'
            }}
            >
                {reservations.map((r) => (
                    <Box key={r.id} sx={{backgroundColor: '#4A4A4A', borderRadius: 4, padding: 2, margin: 2, flexWrap: "wrap"}}>
                        <Typography>{new Date(r.startTime).toDateString()}</Typography>
                        <Typography>{new Date(r.startTime).toLocaleTimeString()}-{new Date(r.endTime).toLocaleTimeString()}</Typography>
                        <Button onClick={() => deleteReservation(r.id)}>Delete</Button>
                    </Box>
                ))}
            </Container> 
        </Container>
    )
}