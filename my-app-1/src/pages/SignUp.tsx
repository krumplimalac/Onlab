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
import SnackBar from '../components/SnackBar';

export default function SignUp() {
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Hibás regisztráció");
  const [error, setError] = useState(true);
  const [chosenRole, setChosenRole] = useState("User");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let jsonData = {
      username: data.get('email'),
      password: data.get('password')
    }
      axios.post(`/api/Auth/Login?username=${jsonData.username}&password=${jsonData.password}&role=${chosenRole}`,jsonData)
      .catch((e: AxiosError) => {
        setOpenErr(true);
        setError(true);
      })
      .then(res => {
        if ( res !== undefined ){
          if(res.status == 200){
            console.log("OK");
            navigate("/Home");
          }else{
            setOpenErr(true);
            setError(true);
          }
        }
    });
  };

  return (
      <Container component="main" maxWidth="xs"
      sx={{backgroundColor: '#30343A',
      paddingTop: '4rem',
      paddingBottom:'4rem'}}>
        <SnackBar text={errorMessage} error={error} isOpen={openErr} setIsOpen={setOpenErr} />
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