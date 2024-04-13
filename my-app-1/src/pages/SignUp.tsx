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
import axios, { AxiosError, AxiosHeaders } from 'axios';
import { useState } from 'react';
import { Paper, Slide, Snackbar } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function SignUp() {
  const [openErr, setOpenErr] = useState(false);
  const navigate = useNavigate();
  
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
      axios.post('/tmp/register',jsonData)
      .catch((e: AxiosError) => {setOpenErr(true)}).
      then(res => {
        if ( res !== undefined ){
          if(res.status == 200){
            console.log("OK");
            navigate("/Home");
          }
        }
    });
  };

  return (
      <Container component="main" maxWidth="xs"
      sx={{backgroundColor: '#30343A',
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
              <Typography sx={{color:"white"}}>Sikertelen bejelentkezés!</Typography>
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
          <Avatar sx={{ m: 1, bgcolor: '#202020'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Regisztráció
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Cím"
                  name="email"
                  autoComplete="email"
                  sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Jelszó"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{backgroundColor: 'white', borderRadius: '5px'}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#222222'}}
            >
              Regisztráció
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/Belepes'>
                  <Typography>Már regisztrált?</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}