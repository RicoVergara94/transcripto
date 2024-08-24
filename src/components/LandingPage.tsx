import React from "react";
import { Container, Typography } from "@mui/material";
import SignIn from "./Sign-In";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Container
        sx={{
          backgroundColor: "#E3F2FD", // Change to your chosen color
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
            backgroundColor: "#6200EE",
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
