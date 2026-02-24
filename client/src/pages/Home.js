import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useState} from 'react'
import { MuiChipsInput } from 'mui-chips-input'
import MediaCard from '../components/MediaCard'
import { getAllBlogs, getBlogBySearch } from '../api'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const [search,setSearch]=useState('')
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchResult,setSearchResult]=useState([])

  const navigate=useNavigate()

  useEffect(()=>{
      const getBlogs=async()=>{
        try{
          const response=await getAllBlogs()
          //console.log("All Blogs:",response.data)
          setBlogs(response.data.blogs)
          console.log({blogs})

        }
        catch(err){
          console.log("Failed:",err)
        }

      }
      getBlogs()
  },[])

  const handleSearch = async () => {
    if (search.trim() || tags.length > 0) {
        const response = await getBlogBySearch({ 
            search: search.trim(), 
            tags: tags.join(',') 
        });
        
        setBlogs(response.data.data); 
        setSearchResult(response.data.data)
        
        navigate(`/blog/search?searchQuery=${search || 'none'}&tags=${tags.join(",") || 'none'}`);
    }
  };
  return (
    <div>
      <Navbar />
      <Box sx={{padding:'4'}}>
        <Box>
          <TextField
            name="search"
            label="Search"
            variant='outlined'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{marginRight:3, borderRadius:"25px"}}
          />
          <MuiChipsInput
              style={{marginRight:3, borderRadius:"25px"}}
              value={tags}
              label='Search tags'
              variant='outlined'
          />
          <Button
              variant='outlined'
              sx={{
                backgroundColor:'#A1887F',
                color:'black',
                borderRadius:'10px',
                mt:0.5,
                '&:hover':{
                  backgroundColor:'#8D6E63',
                  color:'black'
                }


              }}
              onClick={handleSearch}
          > Search</Button>
        </Box>
           {/* Main Container Wrapper */}
<Grid container spacing={1} sx={{ padding: '20px', mt:5 }}>
  
  {/* Header Section */}
  <Grid item xs={12}>
    <Typography variant='h5' sx={{ mb: 4, fontWeight: 'semi-bold' }}>
      {searchResult.length > 0 ? `Search Results (${searchResult.length})` : "All Blogs"}
    </Typography>
  </Grid>

  {/* Blog Display Grid */}
  <Grid container item spacing={7} alignItems="stretch" sx={{mt:8}}>

    {(searchResult.length > 0 ? searchResult : blogs).map((blog) => (
      <Grid item key={blog._id} xs={12} sm={6} md={4} lg={3}>
        <MediaCard data={blog} />
      </Grid>
    ))}

    
    {searchResult.length === 0 && blogs.length === 0 && (
      <Grid item xs={12}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No blogs found.
        </Typography>
      </Grid>
    )}
  </Grid>
</Grid>
      </Box>
    </div>
  )
}

export default Home
