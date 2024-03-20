import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import InterestPosts from "scenes/widgets/InterestPosts";
import FriendListWidget from "scenes/widgets/FriendListWidget";

import InterestsList from "scenes/widgets/InterestList";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userInterests = useSelector(state => state.user.interests);
  const [interests, setInterests] = useState(userInterests);
  const [showInterests, setShowInterests] = useState(false);


  const handleToggleInterests = () => {
    setShowInterests(!showInterests);
  };

  useEffect(() => {
    if (userInterests.length === 0) {
      navigate('/interests');
    }
  }, [userInterests, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ffffff, #93C5FD)',
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: '100%',
          padding: '2rem 6%',
          display: isNonMobileScreens ? 'flex' : 'block',
          gap: '0.5rem',
          justifyContent: 'space-between',
        }}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} onToggleInterests={handleToggleInterests} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
          <InterestPosts userInterests={interests} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget userId={_id} />
            {showInterests && <InterestsList interests={userInterests} />}
           
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
