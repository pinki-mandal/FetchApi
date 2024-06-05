import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, AppBar, Toolbar, Typography, Box, Button, InputAdornment } from '@mui/material';
import PostList from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // New state to track if a search was performed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setDisplayedPosts(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    console.log('Search term:', searchTerm); // Debugging: Log the search term
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered posts:', filteredPosts); // Debugging: Log the filtered posts
    setDisplayedPosts(filteredPosts);
    setSearchPerformed(true); // Mark that a search was performed
  };

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Posts List
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Box>
      {searchPerformed && displayedPosts.length === 0 && (
        <Typography variant="h6" component="div" color="error">
          No results found
        </Typography>
      )}
      <PostList posts={displayedPosts} />
    </Container>
  );
};

export default App;
