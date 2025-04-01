import { Box, Button, Collapse, Container, MenuItem, Select, SelectChangeEvent, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReservationDialog from "../components/ReservationDialog";
import axios from "axios";
import Loading from "../components/Loading";

export default function Foglalas() {
    const days = ['Hétfő','Kedd','Szerda','Csütörtök','Péntek','Szombat','Vasárnap'];
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
    const timeItems = [
        '0:30',
        '1:00',
        '1:30',
        '2:00'
      ];
    const [chosenDay, setChosenDay] = useState('');
    const [chosenTime, setChosenTime] = useState('');
    const [chosenDate, setChosenDate] = useState<Date | undefined>(undefined);
    const [disabled, setDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const [duration, setDuration] = useState('');
    const [people, setPeople] = useState('1');
    const [peopleError, setPeopleError] = useState(false);
    const uiTime = chosenTime+'-'+times[times.indexOf(chosenTime)+timeItems.indexOf(duration)+1];
    const [changed, setChanged] = useState(false);
    const [dates, setDates] = useState<Date[]>([]);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const textFieldSx : SxProps<Theme> = {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            borderRadius: 2,
            marginY: 0.5,
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                display: "none",
            },
            "& input[type=number]": {
                MozAppearance: "textfield",
            },
        }

    const handleChangeDuration = (event: SelectChangeEvent) => {
        setDuration(event.target.value);
        setChanged(true);
    }

    const handlePeopleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPeople(e.target.value);
        if (e.target.validity.valid) {
            setPeopleError(false);
            } else {
            setPeopleError(true);
            }
        }

    const isTimeFull = (day:string,time:string):boolean => {
        let predicate = true;
        dates.map((date) => {
            let index = date.getDay() == 0 ? 6 : date.getDay()-1;
            let hours = (date.getHours()).toString();
            let minutes = date.getMinutes() == 0 ? '00' : date.getMinutes().toString();
            if(  index == days.indexOf(day) && hours+':'+minutes == time){
                predicate = false;
            }
        });
        return predicate;
    }

    const disableButton = (day:string,time:string):boolean => {
        if(disabled) {
            return disabled;
        }
        if(isTimeFull(day,time)){
            return true;
        }
        if(times.indexOf(time) > times.length-(timeItems.indexOf(duration)+2)){
            return true;
        }
        if(chosenDay == ''){
            return false;
        }
        if(day != chosenDay){
            return true;
        }
        if(day == chosenDay && time == chosenTime){
            return false;
        }
        return true;
    }

    const buttonOnClick = (day:string,time:string) => {
        if(chosenDay == day && chosenTime == time){
            setChosenDay('');
            setChosenTime('');
            setChosenDate(undefined);
        } else {
            setChosenDay(day);
            setChosenTime(time);
            let exit = false;
            let i = 0;
            while(!exit && i < dates.length){
                let index = dates[i].getDay() == 0 ? 6 : dates[i].getDay()-1;
                let hours =  (dates[i].getHours()).toString();
                let minutes = dates[i].getMinutes() == 0 ? '00' : dates[i].getMinutes().toString();
                if(  index == days.indexOf(day) && hours+':'+minutes == time){
                    exit = true;
                    let newDate = new Date(Date.UTC(dates[i].getFullYear(),dates[i].getMonth(),dates[i].getDate(),dates[i].getHours(),dates[i].getMinutes(),0,0))
                    setChosenDate( d => d = newDate );
                }
                i++;
            }
        }
    }

    const buttonColor = (day:string,time:string):string => {
        if(chosenDay == day && times.indexOf(time) <= times.indexOf(chosenTime)+timeItems.indexOf(duration) 
            &&
            times.indexOf(time) >= times.indexOf(chosenTime)){
                return '#448844';
        } else if(isTimeFull(day,time)){
            return '#773333';
        } else {
            return '#333333';
        }
    }

    const fetchFreeTimes = async () => {
        setDates(dates => dates = []);
        if(people !== '0' && changed && !peopleError){
            setDisabled(false);
        }
        setLoading(true);
        try 
        {
            const response = await axios.get(`api/Reservation/GetFreeTimes?numberOfPeople=${+people}&duration=${timeItems.indexOf(duration)+1}`);
            const data:string[] = response.data;
            if (data.length == 0) {
                setDates([]);
            } else {
                data.map((i) => {
                    let date = new Date(i);
                    console.log(date);
                    setDates(prevDates => [...prevDates,date]);
                });
            }
        }
        catch(error)
        {
            console.log(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        if(duration != ""){
            fetchFreeTimes();
        }
    },[people,duration])

    useEffect(() => {
        if(finished){
            setChosenDate(undefined);
            setChosenDay('');
            setChosenTime('');
            setDuration('');
            setPeople("1");
            fetchFreeTimes();
        }
    },[finished]);

    //LOG
    useEffect(() => {
        console.log(chosenDate);
    },[chosenDate]);

    return (
        <Container  sx={{marginTop: '1rem', backgroundColor: '#303030', minHeight: '780px'}}>
            { loading ? <Loading /> : null }
            <Typography variant='h3' align="center" paddingTop={2} paddingBottom={2}>Foglalás</Typography>
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
                flexDirection:'column'}}>
                <Container sx={{display: 'flex'}}>
                    <Container disableGutters sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '600px'}}>
                        <Typography margin={0.5} sx={{alignSelf:'center'}} variant='h5'> Hány főre szeretne foglalni?</Typography>
                        <Container disableGutters sx={{width: '200px', alignContent:"center"}}>
                            <TextField
                            sx={textFieldSx}
                            required
                            name="Fő"
                            id="numberofpeople"
                            label="Fő"
                            value={people}
                            onChange={handlePeopleChange}
                            error={peopleError}
                            fullWidth
                            inputProps={{
                                pattern: "[1-9]"
                            }}
                            />
                        </Container>
                    </Container>
                    <Container disableGutters sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '600px', alignSelf:'flex-start'}}>
                        <Typography margin={0.5} sx={{alignSelf:'center'}} variant='h5'> Hány órát szeretne foglalni?</Typography>
                        <Container disableGutters sx={{width: '200px', alignContent:"center"}}>
                        <Select
                        disabled={chosenTime != ''}
                        required
                        name="time"
                        label='Idő'
                        id="time"
                        fullWidth
                        value={duration}
                        onChange={handleChangeDuration}
                        sx={{backgroundColor: '#FFFFFF', color: '#000000'}}
                        >
                        {
                            timeItems.map((option) => (
                            <MenuItem key={option} value={option} >
                                {option}
                            </MenuItem>
                            ))
                        }
                        </Select>
                        </Container>
                    </Container>
                    {disabled ? null :
                    <Button
                    variant="contained"
                    onClick={fetchFreeTimes}
                    disabled={chosenTime != ''}
                    sx={{margin: 1.5, borderRadius: 4, backgroundColor: '#448844','&:hover':{backgroundColor: '#334433'}}}
                    >
                        Frissít
                    </Button>
                    }
                </Container>
                <Collapse in={!disabled}>
                <Container disableGutters sx={{backgroundColor: '#444444', borderRadius: 4, paddingTop: 2}}>
                    <Container disableGutters sx={{display: "flex"}}>
                        <Typography margin={0.5} variant='h5' sx={{flexGrow: 4}}>
                            Válassza ki a foglalás kezdési idejét!
                        </Typography>
                        <Box sx={{borderRadius: 4, backgroundColor: "#666666", flexGrow: 2, minHeight: "42px"}}> 
                            <Collapse in={chosenTime !== ''}>
                                <Typography align="center" variant="h4">
                                    {chosenTime !== "" ? uiTime : ""}
                                </Typography>
                            </Collapse> 
                            <Collapse in={chosenTime == ""}>
                                <Typography align="center" variant="h6" sx={{paddingTop: 0.6}}>
                                    Még nem választott kezdési időt!
                                </Typography>
                            </Collapse>
                        </Box>
                    </Container>
                    <Container disableGutters sx={{display: 'flex', backgroundColor: '#222222'}}>
                    <Container disableGutters sx={{display: 'flex', flexDirection: 'column'}}>
                        <Container sx={{paddingTop: 2.9}}></Container>
                        {times.map((t) => (
                            <Typography key={t} align='center' sx={{borderBottom: 'solid', borderColor: '#191919', marginBottom: 1.62, paddingLeft: 1}}>
                                {t}
                            </Typography>
                        ))}
                    </Container>
                    {days.map((day) => (
                        <Container disableGutters key={day} sx={{display: 'flex', flexDirection: 'column'}}>
                            <Typography variant='h5' align='center' padding={1} >{day}</Typography>
                            {times.filter((t) => (t != '17:00')).map((time) => (
                                <Button 
                                key={day+' '+time} 
                                disabled={disableButton(day,time)} 
                                sx={{
                                    marginTop: 0.25,
                                    marginBottom: 0.25,
                                    marginLeft: 0.5,
                                    marginRight: 0.5,
                                    borderRadius: 0,
                                    backgroundColor: 
                                    buttonColor(day,time),
                                    '&:hover':{
                                        backgroundColor: day == chosenDay && chosenTime == time ?
                                         '#334433' : '#337733',},
                                    
                                }} 
                                onClick={() => buttonOnClick(day,time)}
                                >
                                    <Typography key={day+'-'+time}padding={1.5}></Typography>
                                </Button>
                            ))}
                        </Container>
                    ))}
                    </Container>
                    <Container 
                    disableGutters 
                    sx={{padding: 5, display: 'flex', justifyContent: 'flex-end'}}
                    >
                        <Button 
                        variant='contained' 
                        disabled={chosenTime == ''} 
                        onClick={() => {setOpen(true)}} 
                        sx={{backgroundColor: '#448844','&:hover':{backgroundColor: '#334433'}}}
                        >
                            OK
                        </Button>
                    </Container>
                </Container>
            </Collapse>
            </Container>
            <ReservationDialog 
            open={open} 
            setOpen={setOpen} 
            people={+people} 
            chosenDate={chosenDate} 
            duration={timeItems.indexOf(duration)}
            setFinished={setFinished}
            />
        </Container>
    )
}