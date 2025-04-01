import { Box, Collapse, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import  "../CSS/main.css"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import axios, { AxiosError } from "axios";
import SnackBar from "../components/SnackBar";
import Loading from "../components/Loading";

interface table {
    id:number,
    capacity:number
}

interface reservation {
    reserver: string,
    tableId: number,
    startTime: string,
    endTime: string,
    numberOfPeople: number
}

export default function Foglalasok(){
    const times = [
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00'
    ];
    const [date,setDate] = useState<Dayjs | null>(dayjs('2025-03-20'));
    const [utcDate, setUtcDate] = useState<Date>();
    const [tables, setTables] = useState<table[]>([]);
    const [reservations, setReservations] = useState<reservation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 })
    const onMouseMove = (e:React.MouseEvent) => {
        setCursorPosition({ top: e.screenY-100, left: e.screenX });
    }
    const [hoverData, setHoverData] = useState<reservation | undefined>(undefined);

    const fetchReservations = async () => {
        setLoading(true);
        if(date){
            const response = await axios.get(`api/Reservation?date=${utcDate?.toJSON()}`)
            .catch((e:AxiosError) => {
                console.log(e);
                setError(true);
                    if(e.response){
                        if(e.response.data){
                            setErrorMessage(e.response.data.toString());  
                        }
                    }
                    setOpenSnack(true);
            }).then(res => {
                if (res){
                    setReservations([]);
                    const data:reservation[] = res.data;
                    if(data.length != 0){
                        data.map((r) => {
                            console.log(r);
                            /*let tmp = r;
                            let tmpDate = new Date(r.startTime);
                            tmpDate.setHours(tmpDate.getHours()+2);
                            tmp.startTime = tmpDate.toJSON();*/
                            setReservations(prevReservation => [...prevReservation,r]);
                        })
                    }
                }
            })
            setLoading(false);
        }
    }

    const fetchTables = async () => {
        setLoading(true);
        const response = await axios.get(`api/Table`)
        .catch((e:AxiosError) => {
            console.log(e);
        })
        .then((res) => {
            setTables([]);
            if(res){
                const data:table[] = res.data;
                    if(data.length != 0){
                        data.map((table) => {
                            setTables(prevTable => [...prevTable,table]);
                        })
                    }
            }
        });
        setLoading(false);
    }

    const chosenDateToString = (time:string):string => {
        if(utcDate){
        let thisTime:Date = new Date(utcDate?.toJSON());
        let hour:number = +time.split(":")[0];
        let minutes:number = +time.split(":")[1];
        console.log(utcDate);
        
           thisTime.setFullYear(utcDate.getFullYear());
           thisTime.setUTCMonth(utcDate.getUTCMonth());
           thisTime.setDate(utcDate.getDate()); 
           thisTime.setUTCHours(hour);
           thisTime.setMinutes(minutes);
           thisTime.setSeconds(0);
           thisTime.setMilliseconds(0);
        
        console.log(thisTime);
        return thisTime.toJSON().slice(0,thisTime.toJSON().length-5);
        }
        return ""
    }

    const getReservation = (time:string, table:table):reservation | undefined => {
        let textdate = chosenDateToString(time);
        let reservation = reservations.filter((r) => r.tableId == table.id).filter((r) => r.startTime <= textdate && r.endTime > textdate)[0];
        
        return reservation;
    }

    const handleChange = (e:Dayjs | null) => {
        if(e){
            let offset = e.utcOffset()/-60;
            let tmpDate = new Date(e.toJSON());
            tmpDate.setHours(tmpDate.getHours()-offset);
            setUtcDate(d => d = tmpDate);
            setDate(x => e);
            setOpen(true);
        }
    }

    useEffect(() => {
        if(date && utcDate){
            fetchReservations();
        }
    },[date]);

    const isReserved = (tableId: number, time:string):boolean => {
        let predicate = false;
        let textdate = chosenDateToString(time);
        reservations.filter((r) => r.tableId == tableId).map((res)=>{
            if(res.startTime <= textdate && res.endTime > textdate){
                predicate = true;
            }
        });
        return predicate;
    }

    useEffect(() => {
        fetchTables();
        console.log(tables);
    },[]);

    return(
        <Container sx={{backgroundColor: '#303030',minHeight: '780px',paddingTop: "2rem"}} onMouseMove={onMouseMove}>
            <SnackBar text={errorMessage} isOpen={openSnack} setIsOpen={setOpenSnack} error={error}/>
            {loading ? <Loading/> : null } 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container sx={{display: "flex", justifyContent: "center", marginY: 4, paddingY: 4, backgroundColor: '#444444', borderRadius: 4, flexDirection: "column" }}>
                    <Container sx={{display: "flex", justifyContent: "center"}}>
                        <DatePicker
                        sx={{backgroundColor: "#FFFFFF",borderRadius: 2, color: "#FFFFFF"}}
                        label="dátum"
                        value={date}
                        onChange={handleChange}
                        slotProps={{
                            "textField":{
                                InputLabelProps:{
                                    sx:{
                                        color:"#000000",
                                        backgroundColor:"#FFFFFF", 
                                        borderRadius: 4, 
                                        paddingX: 1,
                                        Height: "40px"
                                    }
                                }
                            }}}
                        />
                    </Container>
                    <Collapse in={open}>
                        <Container disableGutters sx={{display: "flex", flexDirection: "row", borderColor: "#FFFFFF",border: 2}}>
                            <Container disableGutters sx={{display: "flex", flexDirection: "column", borderColor: "#FFFFFF",border: 2}}>
                                {times.map((time) => (
                                    <Box key={time} sx={{border: 1, borderColor: "#BBBBBB", height: "30px"}}>
                                        {time}
                                    </Box>
                                ))}
                            </Container>
                            {tables.map((t,i) => (
                                <Container disableGutters key={i} sx={{display: "flex", flexDirection: "column", borderColor: "#FFFFFF",border: 2}}>
                                    {times.map((time) => (
                                    <Box 
                                    key={t+time} 
                                    sx={{
                                        border: 1, 
                                        borderColor: "#BBBBBB", 
                                        height: "30px", 
                                        backgroundColor: isReserved(t.id,time) ? "#AA2222" : "#22AA22"
                                    }}
                                    onMouseEnter={() =>{setHover(true);setHoverData(getReservation(time,t))}}
                                    onMouseLeave={() => {setHover(false);setHoverData(undefined)}}
                                    >
                                        {hover ?
                                        hoverData ? 
                                        <Box sx={{
                                            padding: 1,
                                            position: "absolute", ...cursorPosition, 
                                            background: "#FFFFFF", 
                                            color: "#000000"}}
                                        >
                                            <Typography>
                                                {hoverData.reserver}
                                            </Typography>
                                            <Typography>
                                                kezdési idő: {hoverData.startTime.split("T")[1]}
                                            </Typography>
                                            <Typography>
                                                befejezési idő: {hoverData.endTime.split("T")[1]}
                                            </Typography>
                                        </Box> 
                                        : null
                                        : null }
                                    </Box>
                                ))}
                                </Container>
                            ))}
                        </Container>
                    </Collapse>
                </Container>
            </LocalizationProvider>
        </Container>
    )
}