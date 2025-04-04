import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { LocalPizza } from '@mui/icons-material';
import { AuthContext, UserContext } from '../App';
import { useContext, useState } from 'react';

const name = 'TemporaryCompanyName';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const auth = useContext(AuthContext);
  const {user} = useContext(UserContext);
  const settings = auth.authenticated ? [ ... ['Kilepes','Regisztracio','Chat'], ... user.role == "Admin" ?  ['Foglalasok'] : []  ]: ['Belepes','Regisztracio'];
  const pages = [ ... ['Hirek', 'Etelek', 'Pizzak', 'Italok'], ... auth.authenticated ? ['Foglalas'] : [] ];
  const handleOpenNavMenu = (event:React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <AppBar position="absolute" sx={{backgroundColor: '#20202a'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          {/**small view */}
          <LocalPizza sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link to="/Home">
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {name}
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }, backdropFilter: "brightness(0.5)"
              }}
            >
              {pages.map((page) => (
                <Link to={page} key={page} >
                  <MenuItem key={page} onClick={handleCloseNavMenu} >
                    <Typography textAlign="center" sx={{color: 'black'}}>
                    {page}
                  </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
         
          {/**Normal view */}
          <LocalPizza sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link to="/Home">
          <Typography
            variant="h6"
            noWrap
            //component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {name}
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }}>
            {pages.map((page) => (
              <Link to={page} key={page}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2,
                  color: 'white', 
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none'
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {/**Profile */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ m: 1, bgcolor: '#202020'}}>
                  <LockOutlinedIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{display:'block', backdropFilter: "brightness(0.5)" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={setting} key={setting}>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{color: 'black'}}>{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;