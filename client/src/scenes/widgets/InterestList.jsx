import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const InterestsList = ({ interests }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const styles = {
    container: {
      margin: '1rem 0',
      padding: '1rem',
      backgroundColor: isDarkMode ? theme.palette.background.paper : '#f7f7f7',
      borderRadius: '8px',
      color: isDarkMode ? theme.palette.text.primary : '#333', 
    },
    title: {
      mb: 2,
      fontWeight: 'bold',
      color: isDarkMode ? theme.palette.text.primary : '#333', 
    },
    interestItem: {
      color: isDarkMode ? theme.palette.text.primary : '#555', 
    },
    noInterestText: {
      color: isDarkMode ? theme.palette.text.secondary : '#999', 
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        Your Interests
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {interests.length > 0 ? (
          interests.map((interest, index) => (
            <Typography key={index} sx={styles.interestItem}>
              {interest}
            </Typography>
          ))
        ) : (
          <Typography sx={styles.noInterestText}>
            No interests selected. Please edit your interests.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InterestsList;
