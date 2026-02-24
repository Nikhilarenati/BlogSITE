import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { MuiChipsInput } from 'mui-chips-input';
import { createBlog } from '../api/index'; 
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        selectedFile: ''
    });
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, selectedFile: reader.result });
        };
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    
        const userProfile = JSON.parse(localStorage.getItem('profile'));
    
    
        const authorId = userProfile?.result?._id || "65cb7e2c0000000000000000"; 

        console.log("Attempting to send data..."); 
        try {
            const response = await createBlog({ ...formData, tags, author: authorId });
            console.log("Success:", response.data);
            window.location.reload()
            navigate('/');

        } catch (err) {
            console.error("API Error:", err);
            alert("Server error. Check console.");
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f0f2f5' }}>
            <Box sx={{ bgcolor: 'white', p: 4, borderRadius: '15px', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)', width: '400px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>Create Blog</Typography>

                <TextField fullWidth label="Title" sx={{ mb: 2 }} value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

                <TextField fullWidth label="Description" multiline rows={3} sx={{ mb: 2 }} value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

                <MuiChipsInput fullWidth label="Tags" value={tags} onChange={(newTags) => setTags(newTags)} sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <input type="file" onChange={handleFileUpload} />
                    {/* Visual Preview of the uploaded image */}
                    {formData.selectedFile && (
                        <img src={formData.selectedFile} alt="preview" style={{ width: '100%', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }} />
                    )}
                </Box>

                <Button fullWidth variant="contained" onClick={handleSubmit}
                    sx={{ bgcolor: '#A1887F', color: 'white', py: 1.5, borderRadius: '10px', '&:hover': { bgcolor: '#8D6E63' } }}>

                    CREATE
                </Button>
            </Box>
        </Box>
        
    );
};

export default Form;