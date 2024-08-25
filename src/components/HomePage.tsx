import React, { useState } from "react";
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
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import SalesScriptContainer from "./SalesScriptContainer";

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
    handleClose();
  };

  const handleScript = (newScript: any) => {
    setScript(newScript);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Header */}
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(90deg, #007FFF 30%, #00CFFF 90%)",
          width: "100%",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", color: "#fff" }}
          >
            Transcripto
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate("/signin")}
            style={{ textTransform: "none" }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <Box
        sx={{
          textAlign: "center",
          margin: "0px 0",
          padding: "20px",
          backgroundColor: "#f0f8ff",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Typography variant="h3" align="center" style={{ fontWeight: "bold", color: "#007FFF" }}>
          Welcome to Transcripto
        </Typography>
        <Typography variant="h5" align="center" style={{ color: "#004F7F", margin: "20px 0" }}>
          Your solution to improving sales coaching and decision-making
        </Typography>
        <Typography variant="h6" align="center" style={{ margin: "20px 0", lineHeight: "1.6" }}>
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
            variant="contained"
            color="primary"
            size="large"
            sx={{ m: 2, textTransform: "none" }}
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
                width: "100%",
                maxWidth: 400,
                bgcolor: "background.paper",
                borderRadius: "8px",
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
                  color="primary"
                  onClick={handleClose}
                  sx={{ mt: 2, textTransform: "none" }}
                >
                  Cancel
                </Button>
                {selectedFile && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmUpload}
                    sx={{ mt: 2, textTransform: "none" }}
                  >
                    Upload
                  </Button>
                )}
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{ width: "100%", textAlign: "center", padding: "20px" }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            fontWeight: "bold",
            color: "#007FFF",
            margin: "40px 0",
          }}
        >
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: "30px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  transition: "0.3s",
                  boxShadow: "0 4px 20px rgba(0, 127, 255, 0.3)",
                  "&:hover": {
                    boxShadow: "0 8px 30px rgba(0, 127, 255, 0.5)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", color: "#004F7F" }}
                  >
                    {feature}
                  </Typography>
                  <Typography style={{ color: "#7F7F7F" }}>
                    Detail about {feature.toLowerCase()}.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider style={{ margin: "40px 0", width: "100%" }} />

      {/* Sales Script Section */}
      <Box sx={{ width: "100%", padding: "0 20px" }}>
        <SalesScriptContainer script={script} handleScript={handleScript} />
      </Box>

      <Divider style={{ margin: "40px 0", width: "100%" }} />

      {/* About Us Section */}
      <Box sx={{ width: "100%", textAlign: "center", padding: "20px" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontWeight: "bold", color: "#007FFF" }}
        >
          About Us
        </Typography>
        <Typography
          variant="h6"
          align="center"
          paragraph
          style={{ color: "#004F7F", lineHeight: "1.6" }}
        >
          We are a team of four passionate developers participating in a
          thrilling hackathon. Over the past 5 weeks, we've collaborated to
          create innovative and impactful projects that sharpen our skills.
          Our team members, Oscar, Ayman, Shashank, and Rohit, bring together
          expertise in both backend and frontend development to build solutions
          that make a difference.
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          padding: "20px 0",
          textAlign: "center",
          backgroundColor: "#f0f8ff",
          borderRadius: "8px",
        }}
      >
        <Typography>© 2024 Transcripto</Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="text"
            color="primary"
            style={{ textTransform: "none" }}
          >
            Privacy Policy
          </Button>
          <Button
            variant="text"
            color="primary"
            style={{ textTransform: "none" }}
          >
            Terms of Service
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
