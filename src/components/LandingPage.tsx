import React from "react";
import { Container, Typography } from "@mui/material";
import SignIn from "./Sign-In";
import "@fontsource/great-vibes"; // Import the Great Vibes font

const LandingPage: React.FC = () => {
  return (
    <div>
      <Container
        sx={{
          backgroundColor: "#D3D3D3", // Change to your chosen color
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h1"
          align="center"
          width="800px"
          sx={{
            backgroundColor: "#D3D3D3",
            fontFamily: "Great Vibes, cursive", // Set font to Great Vibes
          }}
        >
          Transcripto
        </Typography>
        <SignIn />
      </Container>
    </div>
  );
};

export default LandingPage;
