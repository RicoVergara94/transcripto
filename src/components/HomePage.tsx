import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const SalesScriptContainer = (props: any) => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5">Sales Script</Typography>
        <Typography variant="body1" id="script-container">
          {/* Rendered sales script text here */}
          {props.script}
        </Typography>
      </Paper>
    </Container>
  );
};

const HomePage = () => {
  const [script, setScript] = useState("");

  const handleScript = async () => {
    const res = await fetch("./mock-transcript.txt");
    const data = await res.text();
    setScript(data);
  };

  useEffect(() => {}, [script]);
  return (
    <Container>
      {/* Hero Section */}
      <section>
        <Typography variant="h1" align="center">
          Welcome to Transcripto
        </Typography>
        <Typography variant="h4" align="center">
          Your solution to improving sales coaching and decision-making
        </Typography>
        <Typography variant="h5" align="center">
          Our feature empowers sales managers with the tools to efficiently
          annotate sales transcripts. With the ability to add, edit, and delete
          comments, and attach relevant files, you can enhance the detail and
          context of your feedback. Our advanced summarization feature uses
          state-of-the-art language models to generate concise overviews of
          transcripts and comments, helping you quickly grasp key insights and
          make data-driven decisions. This solution directly supports Rilla's
          mission to provide actionable, data-driven feedback, improving sales
          coaching and strategic decision-making.
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              m: 2,
            }}
            onClick={handleScript}
          >
            Get Started
          </Button>
        </Box>
      </section>

      {/* Features Section */}
      <section>
        <SalesScriptContainer script={script} />
      </section>

      <section>
        <Typography variant="h2" align="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Feature 1</Typography>
                <Typography>Detail about feature 1.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Feature 2</Typography>
                <Typography>Detail about feature 2.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Feature 3</Typography>
                <Typography>Detail about feature 3.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      {/* About Section */}
      <section>
        <Typography variant="h2" align="center">
          About Us
        </Typography>
        <Typography align="center">
          Brief description about the project and team.
        </Typography>
      </section>

      {/* Footer */}
      <footer>
        <Typography align="center">© 2024 Your Project Name</Typography>
        <Button variant="text" color="secondary">
          Privacy Policy
        </Button>
        <Button variant="text" color="secondary">
          Terms of Service
        </Button>
      </footer>
    </Container>
  );
};

export default HomePage;
