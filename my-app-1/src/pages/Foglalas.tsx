import { Button, Container, CSSObject, MenuItem, Select, SelectChangeEvent, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReservationDialog from "../components/ReservationDialog";

interface backendFullTime {
    day: string,
    time: string
}

export default function Foglalas() {
    const days = ['Hétfő','Kedd','Szerda','Csütörtök','Péntek','Szombat','Vasárnap'];
    const times = [
        '09:00',
        '09:30',
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
    const [fullTimes, setFullTimes] = useState<backendFullTime[]>([]);
    const [disabled, setDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const [timeSelected, setTimeSelected] = useState('');
    const [people, setPeople] = useState(0);
    const [peopleError, setPeopleError] = useState(false);
    const selectedTime = chosenTime+'-'+times[times.indexOf(chosenTime)+timeItems.indexOf(timeSelected)+1];
    const [changed, setChanged] = useState(false);
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

    const handleChangeTime = (event: SelectChangeEvent) => {
        setTimeSelected(event.target.value);
        setChanged(true);
    }

    const handlePeopleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPeople(e.target.valueAsNumber);
        if (e.target.validity.valid) {
            setPeopleError(false);
            } else {
            setPeopleError(true);
            }
        }

    const isTimeFull = (day:string,time:string):boolean => {
        let predicate = false;
        fullTimes.map((times) => {
            if(times.day == day && times.time == time){
                predicate = true;
            }
        })
        return predicate;
    }

    const disableButton = (day:string,time:string):boolean => {
        if(disabled) {
            return disabled;
        }
        if(isTimeFull(day,time)){
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
        } else {
            setChosenDay(day);
            setChosenTime(time);
        }
    }

    useEffect(() => {
        setFullTimes(prevtimes => [...prevtimes,{day:'Kedd', time:'12:00'}]);
        setFullTimes(prevtimes => [...prevtimes,{day:'Kedd', time:'12:30'}]);
        setFullTimes(prevtimes => [...prevtimes,{day:'Kedd', time:'14:00'}]);
        setFullTimes(prevtimes => [...prevtimes,{day:'Kedd', time:'16:00'}]);
        setFullTimes(prevtimes => [...prevtimes,{day:'Szerda', time:'09:00'}]);
        setFullTimes(prevtimes => [...prevtimes,{day:'Szerda', time:'09:30'}]);
        setFullTimes(prevtimes => [...prevtimes,{day:'Szerda', time:'10:00'}]);
        return () => setFullTimes([])
    },[])

    useEffect(() => {
        if(people !== 0 && changed && !peopleError){
            setDisabled(false);
        }
    },[changed, people])

    return (
        <Container  sx={{marginTop: '1rem', backgroundColor: '#303030'}}>
            <Typography variant='h3' align="center" paddingTop={2} paddingBottom={2}>Foglalás</Typography>
            <Container sx={{marginY: 4,paddingY: 4,backgroundColor: '#444444', borderRadius: 4, display: 'flex', justifyContent:'flex-start',alignContent:'flex-start' ,alignItems: 'flex-start', flexDirection:'column'}}>
                <Container sx={{display: 'flex'}}>
                    <Container disableGutters sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '600px', alignSelf:'flex-start'}}>
                        <Typography margin={0.5} sx={{alignSelf:'center'}} variant='h5'> Hány főre szeretne foglalni?</Typography>
                        <Container disableGutters sx={{width: '200px'}}>
                            <TextField
                            sx={textFieldSx}
                            required
                            name="Fő"
                            id="numberofpeople"
                            label="Fő"
                            type="number"
                            value={people}
                            onChange={handlePeopleChange}
                            error={peopleError}
                            fullWidth
                            inputProps={{
                                pattern: "[0-9]+"
                            }}
                            />
                        </Container>
                    </Container>
                    <Container disableGutters sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '600px', alignSelf:'flex-start'}}>
                        <Typography margin={0.5} sx={{alignSelf:'center'}} variant='h5'> Hány órát szeretne foglalni?</Typography>
                        <Container disableGutters sx={{width: '200px'}}>
                        <Select
                        required
                        name="time"
                        label='Idő'
                        id="time"
                        fullWidth
                        value={timeSelected}
                        onChange={handleChangeTime}
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
                </Container>
            </Container>
            <Container sx={{backgroundColor: '#444444', borderRadius: 4, paddingTop: 2}}>
                <Typography margin={0.5} variant='h5'> Válassza ki a foglalás kezdési idejét!</Typography>
                <Container disableGutters sx={{display: 'flex'}}>
                    <Typography padding={0.5} paddingRight={1.5} sx={{backgroundColor: '#444444'}}>Választott idősáv:</Typography>
                    <Typography padding={0.5} paddingLeft={1.5} >{chosenTime !== '' ? selectedTime : 'Még nem választott kezdési időt!' }</Typography>
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
                                isTimeFull(day,time) ? '#773333' : 
                                day == chosenDay && chosenTime == time 
                                || 
                                chosenDay == day && times.indexOf(time) <= times.indexOf(chosenTime)+timeItems.indexOf(timeSelected) 
                                &&
                                times.indexOf(time) >= times.indexOf(chosenTime) ? '#448844' : 
                                '#333333',
                                '&:hover':{backgroundColor: day == chosenDay && chosenTime == time ? '#334433' : '#337733'}
                            }} 
                            onClick={() => buttonOnClick(day,time)}
                            >
                                <Typography key={day+' '+time} padding={1.5}></Typography>
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
                        Foglalás
                    </Button>
                </Container>
            </Container>
            <ReservationDialog open={open} setOpen={setOpen}/>
        </Container>
    )
}