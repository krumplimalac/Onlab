import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, SxProps, TextField, Theme, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Dispatch, SetStateAction, useState } from "react";
import { UserContext } from "../App";
import axios, { AxiosError } from "axios";
import SnackBar from "./SnackBar";
import Loading from "./Loading";

interface reservation {
    reserverId: string,
    numberOfPeople: number,
    startTime: string,
    endTime: string,
    reserver: string,
    phoneNumber: string;
}

export default function ReservationDialog(
    {open, setOpen, people, chosenDate, duration, setFinished}:
    {open:boolean, setOpen:Dispatch<SetStateAction<boolean>>, people:number, chosenDate:Date | undefined, duration:number, setFinished:Dispatch<SetStateAction<boolean>>}) {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(true);
    const {user,setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    

    const dialogSx : SxProps<Theme> = {
        backgroundColor: '#333333',
        color: '#FFFFFF',
    }
    const dialogContentSx : SxProps<Theme> = {
        backgroundColor: '#3A3A3A', 
        color: '#FFFFFF',
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

    const reserve = async () => {
        setLoading(true);
        console.log(chosenDate);
        if(chosenDate){
            let endTime = new Date();
            endTime.setDate(chosenDate.getDate());
            endTime.setHours(chosenDate.getHours());
            endTime.setMinutes(chosenDate.getMinutes());
            endTime.setMilliseconds(chosenDate.getMilliseconds());
            console.log(chosenDate);
            console.log(endTime);
            console.log(duration);
            switch (duration) {
                case 0: //00:30
                    if (chosenDate.getMinutes() == 0){
                        endTime.setMinutes(30);  
                    } else {
                        endTime.setHours(chosenDate.getHours()+1);
                        endTime.setMinutes(0);
                    }
                    console.log(0);
                    break;
                case 1: //01:00
                    endTime.setHours(chosenDate.getHours()+1);
                    console.log(1);
                    break;
                case 2: //01:30
                    if (chosenDate.getMinutes() == 0){
                        endTime.setHours(chosenDate.getHours()+1);
                        endTime.setMinutes(30);  
                    } else {
                        endTime.setHours(chosenDate.getHours()+2);
                        endTime.setMinutes(0);
                    }
                    console.log(2);
                    break;
                case 3: //02:00
                    endTime.setHours(chosenDate.getHours()+2);
                    console.log(3);
                    break;
            }
            endTime.setSeconds(0);
            endTime.setMilliseconds(0);
            let data : reservation = {
                reserver: name,
                reserverId: user.id,
                phoneNumber: phone,
                numberOfPeople: people,
                startTime: chosenDate.toJSON(),
                endTime: endTime.toJSON()
            }
            console.log(data);
            axios.post('/api/Reservation',data)
            .catch((e:AxiosError) => {
                console.log(e);
                setError(true);
                if(e.response){
                    if(e.response.data){
                        setErrorMessage(e.response.data.toString());  
                      }
                }
                setOpenSnack(true);
            })
            .then(res => {
                if(res != undefined){
                if(res.status = 201){
                    setError(false);
                    setErrorMessage('Sikeres foglalás!')
                    setFinished(true);
                    setOpenSnack(true);
                }else{
                    setError(true);
                    setErrorMessage("Hiba")
                    setOpenSnack(true);
                }
                }
            });
        }
        setLoading(false);
        setName('');
        setPhone('');
    }

    useEffect(() => {
        if(!openSnack){
            setOpen(false);
        }
    },[openSnack])

    const handleClose = () => {
        setOpen(false);
    }

    return (
            <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            PaperProps={{sx:{backgroundColor: '#333333',borderRadius:4, minWidth: '500px'}}}
            >
                <SnackBar text={errorMessage} error={error} isOpen={openSnack} setIsOpen={setOpenSnack} />
                <DialogTitle sx={dialogSx}>
                    {'Adatok megadása'}
                </DialogTitle>
                <DialogContent sx={dialogContentSx}>
                    { loading ? <Loading/> : null }
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
                                        pattern: "[A-Za-z á-űÁ-Ű]+"
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
                                        pattern: "[0-9 +]{11,12}"
                                    }}
                                />
                            </Container>
                    </form>
                </DialogContent>
                <DialogActions sx={{backgroundColor: '#2A2A2A'}}>
                    <Button onClick={handleClose}>
                        Vissza
                    </Button>
                    <Button disabled={name == '' || phone == '' ? true : nameError || phoneError } onClick={reserve}>
                        Foglalás
                    </Button>
                </DialogActions>
            </Dialog>
    )
}