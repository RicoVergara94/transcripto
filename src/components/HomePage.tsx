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
  Divider,
} from "@mui/material";

const SalesScriptContainer = (props: any) => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5">Sales Script</Typography>
        <Typography variant="body1" id="script-container">
          <ul>
            {props.script.conversation?.map((item: any, index: number) => (
              <li key={index} style={{ margin: 5 }}>
                <strong>
                  {item.speaker} ({item.time}):
                </strong>{" "}
                {item.message}
              </li>
            ))}
          </ul>
        </Typography>
      </Paper>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            m: 2,
            backgroundColor: "#007FFF",
          }}
          onClick={props.handleScript}
        >
          Upload
        </Button>
      </Box>
    </Container>
  );
};

const HomePage = () => {
  const [script, setScript] = useState([]);

  const handleScript = async () => {
    const res = await fetch("./script.json");
    const data = await res.json();
    setScript(data);
  };

  useEffect(() => {}, [script]);

  return (
    <Container>
      {/* Hero Section */}
      <section style={{ textAlign: "center", margin: "50px 0" }}>
        <img
          src="/logo512.png"
          alt="Transcripto Logo"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <Typography variant="h1" align="center">
          Welcome to Transcripto
        </Typography>
        <Typography variant="h4" align="center">
          Your solution to improving sales coaching and decision-making
        </Typography>
        <Typography variant="h5" align="center" style={{ margin: "20px 0" }}>
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
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              m: 2,
            }}
            href="/signin"
          >
            Sign In
          </Button>
        </Box>
      </section>

      <Divider style={{ margin: "40px 0" }} />

      {/* Features Section */}
      <section>
        <Typography variant="h2" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 0 15px rgba(0, 127, 255, 0.5)",
                  "&:hover": {
                    boxShadow: "0 0 30px rgba(0, 127, 255, 0.8)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5">{feature}</Typography>
                  <Typography>
                    Detail about {feature.toLowerCase()}.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      <Divider style={{ margin: "40px 0" }} />

      {/* Sales Script Section */}
      <section>
        <SalesScriptContainer script={script} handleScript={handleScript} />
      </section>

      <Divider style={{ margin: "40px 0" }} />

      {/* About Us Section */}
      <section>
        <Typography variant="h2" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          We are a team of four passionate developers participating in a
          thrilling hackathon. Over the past 5 weeks, we've collaborated to
          create innovative and impactful projects that sharpen our skills.
          Our team members, Oscar, Ayman, Shashank, and Rohit, bring together
          expertise in both backend and frontend development to build solutions
          that make a difference.
        </Typography>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: "40px", padding: "20px 0", textAlign: "center" }}>
        <Typography>© 2024 Transcripto</Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="text" color="secondary">
            Privacy Policy
          </Button>
          <Button variant="text" color="secondary">
            Terms of Service
          </Button>
        </Box>
      </footer>
    </Container>
  );
};

export default HomePage;
