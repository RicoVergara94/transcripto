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
            onClick={handleOpen}
          >
            Upload
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
