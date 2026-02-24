import React, { useState } from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import Form from '../components/Form'
import {useNavigate} from 'react-router-dom'

const Navbar = () => { 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate=useNavigate()
  
  const handleSignIn=()=>{
      navigate('/SignIn')
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px',
    outline: 'none',
  };

  return (
    <div>
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px 50px',
          boxShadow: '0px 10px 20px rgba(0,0,0,0.05)',
          bgcolor: 'white' 
      }}>
        <Typography variant='h4' sx={{ fontWeight: 600 }}>BlogSITE</Typography>
        
        <Box>
          {/* ADDED onClick HERE TOO */}
          <Button
            onClick={handleOpen} 
            sx={{
              marginRight: '15px', 
              bgcolor: '#A1887F',
              color: 'white', 
              borderRadius: '10px', 
              textTransform: 'none',
              '&:hover': { bgcolor: '#8D6E63' }
            }}
            variant='contained'
          >
            Create Blog
          </Button>

          <Button
            onClick={handleOpen} 
            sx={{
              bgcolor: '#A1887F',
              color: 'white',
              borderRadius: '10px',
              textTransform: 'none',
              '&:hover': { bgcolor: '#8D6E63' }
            }}
            variant='contained'
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Form />
          </Box>
      </Modal>
    </div>
  );
}

export default Navbar;