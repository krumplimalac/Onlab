import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogTitle, MobileStepper, SxProps, TextField, Theme, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Dispatch, SetStateAction, useState } from "react";


interface table {
    number: number,
    numberOfPeople: number,
    free: boolean
}

export default function ReservationDialog({open,setOpen}:{open:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) {
    const [activeStep, setActiveStep] = useState(0);
    const [tables ,setTables] = useState<table[]>([]);
    const [next, setNext] = useState(false);
    const [chosenTable, setChosenTable] = useState<table>();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [people, setPeople] = useState(0);
    const [peopleError, setPeopleError] = useState(false);

    const dialogSx : SxProps<Theme> = {
        backgroundColor: '#333333',
        color: '#FFFFFF'
    }
    const dialogContentSx : SxProps<Theme> = {
        backgroundColor: '#3A3A3A', 
        color: '#FFFFFF',
        overflow: 'hidden'
    }
    const textFieldSx : SxProps<Theme> = {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        borderRadius: 2,
        margin: 2,
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
    }

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (e.target.validity.valid) {
          setNameError(false);
        } else {
          setNameError(true);
        }
    }

    const handlePhoneChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        if (e.target.validity.valid) {
          setPhoneError(false);
        } else {
          setPhoneError(true);
        }
    }

    const handlePeopleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPeople(e.target.valueAsNumber);
        if(chosenTable && chosenTable.numberOfPeople >= e.target.valueAsNumber && e.target.valueAsNumber > 0){
            if (e.target.validity.valid) {
                setPeopleError(false);
              } else {
                setPeopleError(true);
              }
        } else {
            setPeopleError(true);
        }
        
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNext(true);
    }
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setNext(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        setTables(prevtables => [...prevtables,{number:1,numberOfPeople:4,free:true}]);
        setTables(prevtables => [...prevtables,{number:2,numberOfPeople:4,free:false}]);
        setTables(prevtables => [...prevtables,{number:3,numberOfPeople:8,free:true}]);
        setTables(prevtables => [...prevtables,{number:4,numberOfPeople:6,free:true}]);
        return () => setTables([]);
    },[])

    return (
        <Container>
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'sm'}
            >
                <DialogTitle sx={dialogSx}>
                    {next ?'Adatok megadása': 'Asztal kiválasztása'}
                </DialogTitle>
                <DialogContent sx={dialogContentSx}>
                    { next ? 
                    <Container sx={{height: '400px',display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <form onSubmit={() => {}}>
                                <Container sx={{display: 'flex', flexDirection: 'column'}}>
                                    <TextField
                                        sx={textFieldSx}
                                        required
                                        name="Név"
                                        id="name"
                                        label="Név"
                                        value={name}
                                        onChange={handleNameChange}
                                        error={nameError}
                                        inputProps={{
                                            pattern: "[A-Za-z ]+"
                                        }}
                                    />
                                    <TextField
                                        sx={textFieldSx}
                                        required
                                        name="Telefonszám"
                                        id="tel"
                                        type="tel"
                                        label="Telefonszám"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        error={phoneError}
                                        inputProps={{
                                            pattern: "[0-9 +]+"
                                        }}
                                    />
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
                                        inputProps={{
                                            pattern: "[0-9]+"
                                        }}
                                    />
                                </Container>
                        </form>
                        <Typography variant="h6" align="center" margin={2}>
                            {chosenTable ? 'Választott asztal száma: '+chosenTable.number : 'Még nem választott asztalt!'}
                        </Typography>
                    </Container>
                    :
                    <Container disableGutters sx={{height: '400px',display: 'flex', justifyContent: 'space-between', flexDirection:'column'}}>
                        <Container sx={{paddingTop: 5, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                            {tables.map((table) => (
                                <Button onClick={() => {setChosenTable(table)}} key={table.number} disabled={!table.free} sx={{borderRadius: 8}}>
                                    <Card sx={{backgroundColor: table.free? chosenTable == table ? '#606060' : '#444444' : '#2A2A2A', minWidth: '200px',borderRadius: 8}}>
                                        <CardHeader sx={{color: table.free? '#FFFFFF' :  '#666666'}} title={'Asztal: '+table.number}>
                                        </CardHeader>
                                        <CardContent sx={{color: table.free? '#FFFFFF' : '#666666'}}>
                                            {table.numberOfPeople}{' '}fős
                                        </CardContent>
                                    </Card>
                                </Button>
                            ))}
                        </Container>
                    </Container>
                    }
                    <Container sx={{display: 'flex',justifyContent: 'center'}}>
                        <MobileStepper
                        variant="dots"
                        steps={2}
                        position="static"
                        activeStep={activeStep}
                        sx={{
                            color: '#FFFFFF', 
                            maxWidth: 200, 
                            flexGrow: 1, 
                            backgroundColor: '#3A3A3A',
                            '& .MuiMobileStepper-dot': {
                                backgroundColor: '#2A2A2A',
                                margin: 1,
                                height: '10px',
                                width: '10px'
                            },
                            '& .MuiMobileStepper-dotActive': {
                                backgroundColor: '#FFFFFF',
                            },    
                        }}
                        nextButton={
                            <Button sx={{color: '#FFFFFF'}} size="small" onClick={handleNext} disabled={activeStep === 1}>
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button sx={{color: '#FFFFFF'}} size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                            </Button>
                        }
                        />
                    </Container>
                </DialogContent>
                <DialogActions sx={{backgroundColor: '#2A2A2A'}}>
                    <Button onClick={() => {handleClose();setNext(false)}}>
                        Bezár
                    </Button>
                    <Button disabled={name == '' || phone == '' || people == 0 || chosenTable == undefined ? true : nameError || phoneError || peopleError } onClick={() => {}}>
                        Foglalás
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}