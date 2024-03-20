import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import yourImage from "./Picsart_23-09-25_21-02-44-575.png";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #FFFFFF, #64B5F6)', 
        minHeight: '100vh', 
      }}
    >
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        
      >
        <img src={yourImage} alt="Sociopedia Logo" style={{  width: "130px", height: "auto" }} /> 
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{ backgroundColor: 'black',color: 'white' }} 
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", textAlign: "center", }}>
        Welcome to InterestNet,<br></br>
        look what your interests achieved today!
        </Typography>
        <Form />
      </Box>
    </div>
  );
};

export default LoginPage;
