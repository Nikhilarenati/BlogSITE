import React from 'react'
import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import demo from '../images/demo.jpg'
import { signInAPI } from '../api/index';

const SignIn = () => {

    const [formData,setFormData]=useState({
        email:'',
        password:''
    })

    const navigate=useNavigate()
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSignIn = async (e) => {
        if (e) e.preventDefault();
        try {
            // 2. Call 'signInAPI', NOT 'SignIn'
            const response = await signInAPI(formData); 
            console.log("signin successful", response.data);
            navigate('/');
        } catch (err) {
            console.log('signin failed', err);
            setFormData({ email: '', password: '' });
        }
    };
    
  return(
    <Box display="flex" height="100vh" sx={{ bgcolor:"white" }}>
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center" backgroundcolor="Brown">
            <Typography fontSize="50px" fontWeight="semi-bold">Sign in</Typography>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="3" width="30vw">
                <TextField
                    id="email"
                    name="email"
                    label="email"
                    variant="outlined"
                    style={{marginTop:"30px", width:"80%"}}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <TextField
                    id="password"
                    name="password"
                    label="password"
                    variant="outlined"
                    style={{marginTop:"30px", width:"80%"}}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <Link to="/signUp" style={{textDecoration:"underline"}}>
                <Typography 
                  style={{
                    marginTop:"20px",
                    fontWeight:"bold",
                    textDecoration:"none",
                    '&:hover': {
                        color: "darkblue",
                        textDecoration: "underline",
                    },
                    '&:active': {
                        color: "#0d47a1",
                        transform: "translateY(2px)" // This color shows ONLY while clicking
                    }
                  }}>

                  Create account?
                  </Typography>
                </Link>
                <button style={{
                    border:"1px solid black",
                    marginTop:"10%",
                    width:"80%",
                    fontSize:"20px",
                    fontWeight:"semi-bold",
                    color:"black",
                    borderRadius:"10px",
                    alignContent:"center",
                    backgroundColor:'#A1887F',
                    height:"40px"
                }}
                onClick={handleSignIn}
                >Sign In</button>

            </Box>
        </Box>
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src={demo} style={{ maxHeight:"80vh",maxWidth:"100%"}} alt="demo"/>
        </Box>

    </Box>

  )
}

export default SignIn
