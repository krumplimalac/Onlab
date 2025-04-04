import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext, UserContext } from '../App';
import SnackBar from '../components/SnackBar';
import Loading from '../components/Loading';

export default function SignIn() {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Sikertelen Bejelentkezés!");
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {authenticated, setAuthenticated } = useContext(AuthContext);
  
  let {user,setUser} = useContext(UserContext);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let jsonData = {
      username: data.get('email'),
      password: data.get('password')
    }
      const login = async () => {
        setLoading(true);
        const response = await axios.post(`/api/Auth/Login?username=${jsonData.username}&password=${jsonData.password}`,jsonData)
        .catch(function (error) {
          if (error.response) {
            setErrorMessage("Hibás Email-cím, vagy jelszó!");
            setError(true);
            setOpenErr(true);
          }else {
            console.log(error);
          }
        }).
        then(res => {
          console.log();
          if ( res !== undefined ){
            if(res.status == 200){
              setAuthenticated(a => a = true);
              setUser(
                {...user,
                email:res.data[0].value,
                id:res.data[1].value,
                role:res.data[2].value
              });
              
              console.log(user);
              localStorage.setItem('isAuth','true');
              localStorage.setItem('email',res.data[0].value);
              localStorage.setItem('id',res.data[1].value);
              localStorage.setItem('role',res.data[2].value);
              setErrorMessage("Sikeres bejelentkezés!");
              setError(false);
              setOpenErr(true);
              console.log(document.cookie);
              navigate("/Home");
            }
          }
      });
      setLoading(false);
    }
    login();
  };

  return (
  <Container disableGutters maxWidth={false} sx={{minHeight: '780px'}}>
    <Container component="main" maxWidth="xs" 
      sx={{ 
      backgroundColor: '#30343A',
      paddingTop: '4rem',
      paddingBottom:'4rem',
      }}>
        { loading ? <Loading/> : null }
        <SnackBar text={errorMessage} error={error} isOpen={openErr} setIsOpen={setOpenErr} />
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
              InputProps={{
                style: {
                  color: "#FFFFFF"
                }
              }}
              InputLabelProps={{
                style: {
                  color: "#FFFFFF"
                }
              }}
              sx={{backgroundColor: '#202020', borderRadius: '5px'}}
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
              InputProps={{
                style: {
                  color: "#FFFFFF"
                }
              }}
              InputLabelProps={{
                style: {
                  color: "#FFFFFF"
                }
              }}
              sx={{backgroundColor: '#202020', borderRadius: '5px'}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={errorEmail || errorPass}
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
  </Container>
  );
}
