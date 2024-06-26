import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container, Box, Button} from '@mui/material';
import Logo from '../assets/Asset 4.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function ResponsiveAppBar({ mode, setMode }) {
  const navigate = useNavigate();

  const [hover, sethover] = useState(false);
  const [hover2, sethover2] = useState(false);
   
  const styles = {
    
    container1: {
      backgroundColor: hover && "#3e88d2fa",
     
      padding:"8px 15px", borderRadius:"5px ",border:"none",fontWeight:"bold", cursor:"pointer",fontSize:"14px",color:"black"
},
    container2: {
      backgroundColor: hover2 && "#3e88d2fa", 
    
      padding:"8px 15px", borderRadius:"5px ",border:"none",fontWeight:"bold", cursor:"pointer",fontSize:"14px",color:"black"
}
  }

  return (
    <AppBar position="fixed" >
      <Container>
        <Toolbar disableGutters>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 1
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              height={100}
              width={150}
             
              style={{ cursor: 'pointer',position:"relative", top:"20px" }}
              onClick={() => {
                navigate('/');
              }}

            />
            <Box
            
            sx={{
              padding:"5px",
              display:"flex",
              gap:"15px"
            }}
            >
           

          <Button  variant='text'
          style={styles.container1}
          onMouseEnter={()=>sethover(true)}
          onMouseLeave={()=>sethover(false)}
          onClick={() => {navigate('/signin',{ state: { user: 'Student'}})}}>
            Student</Button>



          <Button  className='hover'
          style={styles.container2}
          onMouseEnter={()=>sethover2(true)}
          onMouseLeave={()=>sethover2(false)}
          onClick={() => {navigate('/signin', { state: { user: 'Startup'}})}}
           >StartUp</Button>


            </Box>

        
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
