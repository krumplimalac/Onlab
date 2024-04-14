import { Paper, Slide, Snackbar, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";

export default function SnackBar({text,error,isOpen}:{text:string, error:boolean, isOpen:boolean}){
    const [open, setOpen] = useState(isOpen);
    const [message, setMessage] = useState(text);
    let color = error ? "#BB1010" : "#10BB44";

    useEffect(()=>{
        setMessage(text);
        setOpen(isOpen);
    },[text,error,isOpen]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          setOpen(false);
          return;
        }
      };

    return (
        <Snackbar
              open={open}
              onClose={handleClose}
              autoHideDuration={5000}
              TransitionComponent={Slide}
              anchorOrigin={{vertical: 'top',horizontal: 'center'}}
            >
              <Paper elevation={10} sx={{backgroundColor: color,margin:'10px',padding:'15px',width: "300px", display: "flex", justifyContent:"space-between"}}>
              <Typography sx={{color:"white"}}>{message}</Typography>
              {error ? <ErrorIcon/> : <CheckCircleIcon/>}
              </Paper>
        </Snackbar>
    )
}