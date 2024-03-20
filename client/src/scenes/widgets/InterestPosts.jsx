import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Unliked icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Liked icon
import ShareIcon from '@mui/icons-material/Share'; 

const InterestPosts = ({ userInterests }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchInterestPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/interests', {
          params: { interests: userInterests.join(',') }
        });
    
        if (response.data && Array.isArray(response.data.users)) {
          const fetchedPosts = response.data.users.flatMap(user => {
            
            return Array.isArray(user.news) 
              ? user.news.flatMap(newsItem => newsItem.articles || []) 
              : [];
          });
          setPosts(fetchedPosts);
        } else {
          console.error('Unexpected response structure:', response.data);
          setError('Unexpected response structure');
        }
      } catch (error) {
        console.error('Failed to fetch interest posts:', error);
        setError('Failed to fetch interest posts');
      } finally {
        setIsLoading(false);
      }
    };
    

    if (userInterests.length > 0) {
      fetchInterestPosts();
    }
  }, [userInterests]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  const handleLikeClick = (index) => {
    setLikedPosts(likedPosts => {
      const newLikes = [...likedPosts];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  const handleShareClick = (post) => {
    navigator.clipboard.writeText(post.url) 
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Could not copy URL:', err));
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {posts.map((post, index) => {
        if (!post) {
          console.error(`Post at index ${index} is undefined`);
          return null;
        }

        return (
          <Card key={index} sx={{ Width: "100%" }}>
            {post.image && (
              <CardMedia
                component="img"
                height="auto"
                width="100%"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                image={post.image}
                alt={post.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: "1rem" }}>
                {post.description}
              </Typography>
              
            </CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={() => handleLikeClick(index)} color="primary">
              {likedPosts[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={() => handleShareClick(post)}>
              <ShareIcon />
            </IconButton>
          </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export default InterestPosts;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Typography, CircularProgress } from '@mui/material';

// const InterestPosts = ({ userInterests }) => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchInterestPosts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('http://localhost:3001/api/interests', {
//           params: { interests: userInterests.join(',') }
//         });
//         setPosts(response.data);
//       } catch (error) {
//         setError('Failed to fetch interest posts');
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (userInterests.length > 0) {
//       fetchInterestPosts();
//     }
//   }, [userInterests]);

//   if (isLoading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>News Based on Your Interests</Typography>
//       {posts.map((post, index) => (
//         <Box key={index} mb={2}>
//           <Typography variant="h6">{post.title}</Typography>
//           <Typography variant="body2">{post.description}</Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default InterestPosts;




// import React, { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const InterestPosts = ({ userInterests }) => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchAllPosts = async () => {
// //       setIsLoading(true);

// //       try {
// //         const allPosts = await Promise.all(
// //           userInterests.map(async (interest) => {
// //             const accessKey = process.env.REACT_APP_VARIABLE_NAME; // Replace with your actual API key
// //             const baseUrl = "http://api.mediastack.com/v1/news";

// //             const response = await axios.get(baseUrl, {
// //               params: {
// //                 access_key: accessKey,
// //                 keywords: interest,
// //                 countries: 'in',
// //                 limit: 25,
// //               },
// //             });

// //             return response.data.data; // Assuming the API returns a data object with the posts
// //           })
// //         );

// //         setPosts(allPosts.flat()); // Flatten the nested array into a single array
// //       } catch (error) {
// //         console.error(`Error fetching all posts:`, error);
// //         setError(error.message || 'An error occurred while fetching posts.');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     if (userInterests.length > 0) {
// //       fetchAllPosts();
// //     }
// //   }, [userInterests]);
// // React component making a request to your server
// useEffect(() => {
//     const fetchInterestPosts = async () => {
//       try {
//         const response = await axios.get('/api/interests', {
//           params: { interests: userInterests.join(',') } // Convert array to comma-separated string
//         });
//         setPosts(response.data);
//       } catch (error) {
//         setError('Failed to fetch interest posts');
//         console.error(error);
//       }
//     };
  
//     if (userInterests.length > 0) {
//       fetchInterestPosts();
//     }
//   }, [userInterests]);
  

//   if (isLoading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         News Based on Your Interests
//       </Typography>
//       {posts.map((post, index) => (
//         <Box key={index} mb={2}>
//           <Typography variant="h6">{post.title}</Typography>
//           <Typography variant="body2">{post.description}</Typography>
//           {/* Add other post details here */}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default InterestPosts;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Typography, CircularProgress } from '@mui/material';

// const InterestPosts = ({ userInterests }) => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   useEffect(() => {
//     const fetchInterestPosts = async () => {
//       setIsLoading(true);
//       try {
        
//         const response = await axios.get('http://localhost:3001/api/interests', {
//           params: { interests: userInterests.join(',') }
//         });
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Axios error:', error.response ? error.response.data : error.message);
//             throw new Error(`Failed to fetch data from Mediastack API: ${error.message}`);
//         // console.error('Failed to fetch interest posts:', error);
//         // setError('Failed to fetch interest posts');
//       } finally {
//         setIsLoading(false);
//       }
      
//     };

//     if (userInterests.length > 0) {
//       fetchInterestPosts();
//     }
    
//   }, [userInterests]);

//   if (isLoading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>News Based on Your Interests</Typography>
//       {posts.map((post, index) => (
//         <Box key={index} mb={2}>
//           <Typography variant="h6">{post.title}</Typography>
//           <Typography variant="body2">{post.description}</Typography>
//           {/* Add other post details here */}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default InterestPosts;
