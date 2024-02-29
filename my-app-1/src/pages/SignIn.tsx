import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';


export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <Container component="main" maxWidth="xs" 
      sx={{ 
      backgroundColor: '#30343A',
      paddingTop: '4rem',
      paddingBottom:'4rem'}}>
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Cím"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              sx={{backgroundColor: 'white', borderRadius: '5px'}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Emlékezz rám"
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