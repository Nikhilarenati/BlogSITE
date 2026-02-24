import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import EditForm from './EditForm';
import download from '../images/download.jpeg';
import { deleteBlog } from '../api';

function MediaCard({ data }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
    console.log("Attempting to delete ID:", data._id); // CHECK THIS IN BROWSER
    if (!data._id) return console.log("Error: No ID found for this card");

    try {
        const response = await deleteBlog(data._id);
        window.location.reload();
    } catch (err) {
        console.log("Failed to delete", err.response?.data || err.message);
    }
}
    const modalStyle = {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 400, bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: '15px', outline: 'none',
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Card sx={{ maxWidth: 345, borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <CardMedia
                    component="img"
                    sx={{ height: 220, objectFit: 'cover' }}
                    // Priority 1: Database Image. Priority 2: Local Fallback
                    image={data.selectedFile || download}
                    title={data.title}
                    // This ensures that if the Base64 string is corrupted, it still shows an image
                    onError={(e) => { e.target.src = download; }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                    <Typography
                    color='text.secondary'
                    sx={{
                        fontSize: "14px",      // Reduced size for tags usually looks better
                        lineHeight: '20px',
                        margin: '10px 0',
                        fontWeight: 400
                    }}
>

                    {data.tags?.map((tag, index) => (
                    <span key={index} style={{ marginRight: '5px' }}>
                     {`#${tag} `}
                    </span>
                    ))}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        {data.tags?.map((tag, index) => (
                            <Typography key={index} variant="caption" sx={{ mr: 1, color: '#A1887F' }}>
                                #{tag}
                            </Typography>
                        ))}
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                    <Button size="small" color="error" onClick={handleDelete}><Delete /></Button>
                    <Button size="small" onClick={handleOpen} sx={{ color: '#A1887F' }}><Edit /></Button>
                </CardActions>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <EditForm data={data} />
                </Box>
            </Modal>
        </Box>
    );
}

export default MediaCard;