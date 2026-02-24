import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { MuiChipsInput } from 'mui-chips-input';
import { editBlog } from '../api';
import {useNavigate} from 'react-router-dom';

const EditForm = ({data}) => {
    const [formData, setFormData] = useState({
        title:data.title,
        description: data.description,
        selectedFile: data.selectedFile
    });

    const [tags, setTags] = useState(data.tags);
    const navigate=useNavigate()

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, selectedFile: reader.result });
        };
        if (file) reader.readAsDataURL(file);
    };

    // This function must be defined BEFORE the return statement
    const handleSubmit =async() => {
        console.log("Form Data:", formData);
        console.log("Tags:", tags);
        alert("Blog Created! Check the console.");
        try{
            const id=data._id
            const response=await editBlog(id,{...formData,tags})
            console.log("blog edited successfully",response.data)
            window.location.reload()
            navigate('/')
        }
        catch(err){
            console.log("failed :",err)
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '30vh', 
                bgcolor: '#f0f2f5', 
            }}
        >
            <Box
                sx={{
                    bgcolor: 'white',
                    p: 4,
                    borderRadius: '8px',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                    width: '400px', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 'semi-bold', mb: 4, color: '#333' }}>
                    Edit Blog
                </Typography>

                {/* Title Input */}
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    sx={{ 
                        mb: 2, 
                        bgcolor: '#f9f9f9',
                        '& .MuiOutlinedInput-notchedOutline': {
                         borderColor: 'rgba(0, 0, 0, 0.1)', 
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                    }}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                {/* Description Input */}
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    sx={{ 
                        mb: 2, 
                        bgcolor: '#f9f9f9',
                        '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.1)', 
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                    }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                {/* Tags Input */}
                <MuiChipsInput
                    fullWidth
                    label="Tags"
                    variant="outlined"
                    value={tags}
                    onChange={(newTags) => setTags(newTags)}
                    sx={{ 
                        mb: 2, 
                        bgcolor: '#f9f9f9',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                    }}
                />

                {/* File Input */}
                <Box sx={{ alignSelf: 'flex-start', mb: 4 }}>
                    <input 
                        type="file" 
                        onChange={handleFileUpload} 
                        style={{ fontSize: '12px' }}
                    />
                </Box>

                {/* Black Create Button - Matched to your image */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        bgcolor: '#A1887F', 
                        color: 'black',
                        py: 1.5,
                        borderRadius: '10px', 
                        fontWeight: 'semi-bold',
                        fontSize: '16px',
                        '&:hover': { bgcolor: '#8D6E63' }
                    }}
                    onClick={handleSubmit} 
                >
                    Edit
                </Button>
            </Box>
        </Box>
    );
};

export default EditForm;