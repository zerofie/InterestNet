import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInterestes } from 'state'; 
import { Button, Box, Typography, Grid } from '@mui/material';
import yourImage from "./Picsart_23-09-25_21-02-44-575.png";
const topicsData = {
  
  Tech: ["Tesla", "SpaceX", "Elon Musk", "iPhone", "Android", "Artificial Intelligence", "Blockchain", "Virtual Reality", "Cybersecurity", "Robotics", "Machine Learning", "Cloud Computing", "Data Science", "Web Development", "Gaming", "Internet of Things (IoT)", "Augmented Reality", "Biotechnology", "Autonomous Vehicles", "Tech Startups"],
    Business: ["Entrepreneurship", "Investing", "Stock Market", "Small Business", "Marketing", "Sales", "Management", "Leadership", "Finance", "Economics", "Startups", "Business Strategy", "Business Innovation", "Venture Capital", "Corporate Finance", "Business Ethics", "Human Resources", "Supply Chain Management", "International Business", "Business News"],
    Media: ["Film", "Television", "Digital Streaming", "Hollywood", "Film Festivals", "Cinema", "Documentaries", "Animation", "Movie Reviews", "TV Shows", "Web Series", "Entertainment News", "Celebrity Gossip", "Music", "Music Artists", "Concerts", "Album Releases", "Music Genres", "Radio", "Podcasts", "Books", "Literature"],
    Sports: ["Football (Soccer)", "American Football", "Basketball", "Tennis", "Cricket", "Rugby", "Baseball", "Golf", "Hockey", "Formula 1", "Motorsports", "Athletics", "Swimming", "Boxing", "Martial Arts", "Olympics", "Extreme Sports", "Esports", "Sports Betting", "Sports Science", "Sports Medicine","Sportscafe","Xtratime"],
    Fashion: ["Fashion Trends", "Clothing Brands", "Footwear", "Accessories", "Designer Labels", "Fashion Shows", "Fashion Design", "Street Fashion", "Sustainable Fashion", "Vintage Fashion", "High Fashion", "Fashion Photography", "Fashion Magazines", "Beauty", "Makeup", "Skincare", "Hairstyles", "Cosmetics", "Perfumes", "Nail Art", "Fashion and Culture"]
};

function InterestsPage() {
  const [selectedMainInterest, setSelectedMainInterest] = useState('');
  const [selectedSubInterests, setSelectedSubInterests] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInterests = useSelector(state => state.user.interests);
  const userId = useSelector(state => state.user._id);

  useEffect(() => {
    
    const initialSubInterests = {};
    Object.keys(topicsData).forEach(category => {
      initialSubInterests[category] = userInterests.filter(interest => topicsData[category].includes(interest));
    });
    setSelectedSubInterests(initialSubInterests);
  }, [userInterests]);

  const handleMainInterestClick = (interest) => {
    setSelectedMainInterest(interest);
  };

  const handleSubInterestClick = (subInterest) => {
    setSelectedSubInterests(prev => {
      const updatedSubInterests = prev[selectedMainInterest] || [];
      if (updatedSubInterests.includes(subInterest)) {
        return { ...prev, [selectedMainInterest]: updatedSubInterests.filter(si => si !== subInterest) };
      } else {
        return { ...prev, [selectedMainInterest]: [...updatedSubInterests, subInterest] };
      }
    });
  };

  const handleNextClick = async () => {
    const interestsToUpdate = Object.values(selectedSubInterests).flat();
    const response = await fetch('http://localhost:3001/updateInterests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interests: interestsToUpdate, userId }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setInterestes({ interests: interestsToUpdate }));
      alert(data.message);
      navigate('/home');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

 
    return (
      <Box
      sx={{
        p: 2,
        background: 'linear-gradient(to right, white, #3B82F6)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
      }}
    >
       <Box sx={{ textAlign: 'center', width: '100%' }}>
  
  <img 
    src={yourImage} 
    alt="Interests Network Logo" 
    style={{ width: "130px", height: 'auto', marginTop: '-150px' }} 
  />
  <Typography variant="h4" sx={{ mb: 2 }}>
    Interests
  </Typography>
  {}
</Box>

  
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}> 
        {Object.keys(topicsData).map(interest => (
          <Grid item key={interest}>
            <Button 
              variant="contained"
              color={selectedMainInterest === interest ? 'primary' : 'secondary'}
              onClick={() => handleMainInterestClick(interest)}
            >
              {interest}
            </Button>
          </Grid>
        ))}
      </Grid>
  
        <Box sx={{ display: selectedMainInterest ? 'block' : 'none' }}>
        {selectedMainInterest && topicsData[selectedMainInterest].map(topic => (
          <Button
            key={topic}
            variant="outlined"
            sx={{
              m: 1,
              color: selectedSubInterests[selectedMainInterest]?.includes(topic) ? 'white' : 'white',
              backgroundColor: selectedSubInterests[selectedMainInterest]?.includes(topic) ? 'primary.main' : 'black',
              '&:hover': {
                backgroundColor: selectedSubInterests[selectedMainInterest]?.includes(topic) ? 'primary.dark' : 'grey.900', 
                color: 'white', 
              }
            }}
            onClick={() => handleSubInterestClick(topic)}
          >
            {topic}
          </Button>
        ))}
      </Box>
  
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Selected Sub-Interests:
          </Typography>
          <ul>
            {Object.values(selectedSubInterests).flat().map((subInterest, index) => (
              <li key={index}>{subInterest}</li>
            ))}
          </ul>
        </Box>
  
        <Button 
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Box>
    );
}

export default InterestsPage;
