import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";


const HomePage = () => {
  const [script, setScript] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleConfirmUpload = () => {
    if (selectedFile) {
      navigate("/file-viewer", { state: { file: selectedFile } });
    }
    // Close modal after confirming upload
    handleClose();
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

            onClick={handleOpen}

          >
            Sign In
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="upload-modal-title"
            aria-describedby="upload-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="upload-modal-title" variant="h6" component="h2">
                Upload Your File
              </Typography>
              <input
                type="file"
                onChange={handleFileUpload}
                style={{ marginTop: "16px", width: "100%" }}
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
                {selectedFile && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleConfirmUpload}
                    sx={{ mt: 2 }}
                  >
                    Upload
                  </Button>
                )}
              </Box>
            </Box>
          </Modal>
        </Box>
      </section>



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
