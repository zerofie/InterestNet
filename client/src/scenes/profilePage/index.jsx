import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import Interests from "./interests"; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showInterests, setShowInterests] = useState(false);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const toggleInterests = () => {
    setShowInterests(!showInterests);
  };

  if (!user) return null;

  return (
    <Box sx={{ background: 'linear-gradient(to right, #ffffff, #93C5FD)', minHeight: '100vh' }}>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <FriendListWidget userId={userId} />
          {/* <Button onClick={toggleInterests} sx={{ marginTop: '1rem' }}>
            {showInterests ? "Hide Interests" : "Show Interests"}
          </Button> */}
          {showInterests && <Interests interests={user.interests || []} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
