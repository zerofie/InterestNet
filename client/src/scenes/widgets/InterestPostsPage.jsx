import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Typography, CircularProgress, Card, CardContent, Button, Grid } from '@mui/material';

const InterestPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchInterestPosts = async () => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('query');

      try {
        const response = await axios.get(`http://localhost:3001/api/search-interests?query=${encodeURIComponent(query)}`);
        setPosts(response.data.data); 
      } catch (error) {
        console.error('Failed to fetch interest posts:', error);
        setError('Failed to fetch interest posts');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchInterestPosts();
  }, [location]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ 
      flexGrow: 1, 
      marginTop: 2,
      background: 'linear-gradient(to right, rgb(255, 255, 255), rgb(100, 181, 246))'
    }}>
      <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
        Home Page
      </Button>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                {post.image && (
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                )}
                <Typography variant="body1">
                  {post.description}
                </Typography>
               
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InterestPostsPage;
