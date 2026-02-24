import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signUpAPI } from '../api/index';
import demo from '../images/demo.jpg';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: '',
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        if (e) e.preventDefault();
        try {
            // Calling the renamed API function
            const { data } = await signUpAPI(formData); 
            console.log("Signup successful", data);
            
            // Store token for future authenticated requests
            localStorage.setItem('profile', JSON.stringify(data));
            
            navigate('/signin');
        } catch (err) {
            // Improved error logging to see the actual backend message
            const errorMsg = err.response?.data?.message || "Signup failed";
            alert(errorMsg);
            console.error(err);
        }
    };

    return (
        <Box display="flex" height="100vh" sx={{ bgcolor: "white" }}>
            <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                <img src={demo} style={{ maxHeight: "80vh", maxWidth: "100%" }} alt="demo" />
            </Box>
            
            <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h3" fontWeight="bold">Sign up</Typography>
                
                <Box display="flex" flexDirection="column" gap={3} mt={4} width="30vw">
                    <TextField name="name" label="Username" fullWidth variant="outlined" 
                        value={formData.name} onChange={handleInputChange} />
                    
                    <TextField name="email" label="Email" fullWidth variant="outlined" 
                        value={formData.email} onChange={handleInputChange} />
                    
                    <TextField name="password" label="Password" type="password" fullWidth variant="outlined" 
                        value={formData.password} onChange={handleInputChange} />
                    
                    <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth variant="outlined" 
                        value={formData.confirmPassword} onChange={handleInputChange} />
                    
                    <Link to="/signin" style={{ textDecoration: 'none', color: 'blue' }}>
                        Already have an account? Sign In
                    </Link>

                    <Button 
                        onClick={handleSignUp}
                        variant="contained" 
                        sx={{ 
                            bgcolor: '#A1887F', 
                            color: 'white', 
                            height: '50px',
                            '&:hover': { bgcolor: '#8D6E63' } 
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;