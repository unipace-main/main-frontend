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
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Asset 4.svg";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function ResponsiveAppBar({ studentName, setStudentDetails }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const moveToNavPage = (value) => {
    handleCloseNavMenu();
    navigate(value.route, { state: { type: value.page } });
  };

  const moveToAccountPage = () => {
    handleCloseUserMenu();
    navigate('account');
  };

  const logOut = () => {
    handleCloseUserMenu();
    setStudentDetails(null);
    localStorage.removeItem('localStorageStudentId');
    localStorage.removeItem('localStorageStudentToken');
    navigate('/');
  };

  return (
    <AppBar position="fixed" style={{width:"100vw",height:"70px",backgroundColor:"white",
      // boxShadow:"black -4px -7px 5px 10px"
    }}>
      <Container>
        <Toolbar disableGutters style={{justifyContent:"space-between"}}>
          <Box
            sx={{
              height: '100%',
              alignItems: 'center',
              display: { xs: 'none', md: 'flex' },
              mr: 2,
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              height={90}
              width={120}
             
              style={{ cursor: 'pointer',position:"relative", top:"20px" }}
              onClick={() => {
                navigate('dashboard', { state: { type: 'Internship' } });
              }}
            />
          </Box>

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
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
          </Box>
          <Box
            sx={{
              height: '100%',
              alignItems: 'center',
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              width={60}
              height={60}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('dashboard', { state: { type: 'Internship' } });
              }}
            />
          </Box>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((value, key) => (
              <Button onClick={() => moveToNavPage(value)} sx={{ my: 2, color: 'white', display: 'block' }} key={key}>
                {value.page}
              </Button>
            ))}
          </Box> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={studentName} src="#" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
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
              <MenuItem onClick={moveToAccountPage}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} /> {'Account'}
                </Box>
              </MenuItem>
              <MenuItem onClick={logOut}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <LogoutIcon sx={{ mr: 1 }} /> {'Logout'}
                </Box>
              </MenuItem>
        
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
