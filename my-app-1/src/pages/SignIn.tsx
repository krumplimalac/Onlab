import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Paper, Slide, Snackbar } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { AuthContext } from '../components/AuthProvider';


export default function SignIn() {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const navigate = useNavigate();
  const {authenticated, setAuthenticated} = useContext(AuthContext)

  const handleChangeEmail = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.validity.valid) {
      setErrorEmail(false)
    } else {
      setErrorEmail(true)
    }
  };

  const handleChangePass = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.validity.valid) {
      setErrorPass(false)
    } else {
      setErrorPass(true)
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      setOpenErr(false);
      return;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let jsonData = {
      email: data.get('email'),
      password: data.get('password')
    }
      axios.post('/tmp/login?useCookies=true',jsonData)
      .catch((e: AxiosError) => {setOpenErr(true)}).
      then(res => {
        if ( res !== undefined ){
          if(res.status == 200){
            setAuthenticated(true);
            navigate("/Home");
          }
        }
    });
  };

  return (
      <Container component="main" maxWidth="xs" 
      sx={{ 
      backgroundColor: '#30343A',
      paddingTop: '4rem',
      paddingBottom:'4rem'}}>
        <Snackbar
              open={openErr}
              onClose={handleClose}
              autoHideDuration={5000}
              TransitionComponent={Slide}
              anchorOrigin={{vertical: 'top',horizontal: 'center'}}
            >
              <Paper elevation={10} sx={{backgroundColor: "#BB1010",margin:'10px',padding:'15px',width: "300px", display: "flex", justifyContent:"space-between"}}>
              <Typography sx={{color:"white"}}>Sikertelen Bejelentkezés!</Typography>
              <ErrorIcon/>
              </Paper>
          </Snackbar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#202020' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Belépés
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Cím"
              name="email"
              autoComplete="email"
              inputProps={{type: "email"}}
              autoFocus
              onFocus={handleChangeEmail}
              onChange={handleChangeEmail}
              error={errorEmail}
              sx={{backgroundColor: 'white', borderRadius: '5px'}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Jelszó"
              type="password"
              id="password"
              onFocus={handleChangePass}
              onChange={handleChangePass}
              error={errorPass}
              autoComplete="current-password"
              sx={{backgroundColor: 'white', borderRadius: '5px'}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#222222' }}
            >
              Belépés
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/Regisztracio'>
                  <Typography>Még nem regisztrált?</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}