import React, { useState, useEffect } from "react";
// import { convertTextToJson } from "./AIJsonConverter";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  IconButton,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Navbar from "./navBar";
import * as mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

// Set the workerSrc for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const SalesScriptContainer: React.FC = () => {
  const location = useLocation();
  const file = location.state?.file as File;

  const [fileContent, setFileContent] = useState<string | null>(null);
  const [jsonContent, setJsonContent] = useState<JsonContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  interface ConversationEntry {
    speaker: string;
    timestamp: string;
    message: string;
    comment?: string;
  }
  interface JsonContent {
    conversation: ConversationEntry[];
  }

  useEffect(() => {
    if (file) {
      setFileContent(null);
      setJsonContent(null); // Reset JSON content
      setError(null);
      setLoading(true);

      const reader = new FileReader();

      reader.onload = async () => {
        const content = reader.result as ArrayBuffer;

        try {
          if (file.type === "application/pdf") {
            const pdf = await pdfjsLib.getDocument({ data: content }).promise;
            const numPages = pdf.numPages;
            let text = "";
            for (let i = 1; i <= numPages; i++) {
              const page = await pdf.getPage(i);
              const pageText = await page.getTextContent();
              const textItems = pageText.items as Array<{ str: string }>;
              text += textItems.map((item) => item.str).join(" ");
            }
            setFileContent(text);
            console.log("PDF file content:", text);
          } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            const result = await mammoth.extractRawText({
              arrayBuffer: content,
            });
            setFileContent(result.value);
            console.log("DOCX file content:", result.value);
          } else if (file.type === "text/plain") {
            const text = new TextDecoder().decode(content);
            setFileContent(text);
            console.log("Text file content:", text);
          } else {
            setError(
              "File type not supported. Only txt, docx, and pdf files are allowed."
            );
            setLoading(false);
            return; // Exit early
          }
        } catch (e) {
          setError("Error processing file.");
          console.error(e);
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
        setLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } else {
      setError("No file selected.");
      setLoading(false);
    }
  }, [file]);

  const jsonObject = {
    conversation: [
      {
        timestamp: "00:00:00",
        speaker: "Sales Rep",
        message:
          "Hi there! Thank you for taking the time to speak with me today. How are you doing?",
      },
      {
        timestamp: "00:00:05",
        speaker: "Customer",
        message: "I'm doing well, thank you. How about you?",
      },
      {
        timestamp: "00:00:07",
        speaker: "Sales Rep",
        message:
          "I'm great, thanks for asking! So, I understand you're interested in our new software solution for...",
      },
      {
        timestamp: "00:00:15",
        speaker: "Customer",
        message:
          "Yes, I've been looking for something to help manage my customer relationships more effectively.",
      },
      {
        timestamp: "00:00:20",
        speaker: "Sales Rep",
        message:
          "That's great to hear! Our CRM platform is designed specifically for small to medium-sized businesses...",
      },
      {
        timestamp: "00:00:32",
        speaker: "Customer",
        message: "That sounds promising. How does the pricing work?",
      },
      {
        timestamp: "00:00:35",
        speaker: "Sales Rep",
        message:
          "We offer three tiers of pricing depending on the features and number of users. The basic plan starts...",
      },
      {
        timestamp: "00:00:50",
        speaker: "Customer",
        message:
          "The professional plan seems like it might be a good fit. What kind of support do you offer?",
      },
      {
        timestamp: "00:00:55",
        speaker: "Sales Rep",
        message:
          "We provide 24/7 support through chat, email, and phone for all our plans. Plus, we offer a dedicated...",
      },
      {
        timestamp: "00:01:05",
        speaker: "Customer",
        message:
          "That's good to know. Can I try the software before committing?",
      },
      {
        timestamp: "00:01:08",
        speaker: "Sales Rep",
        message:
          "Absolutely! We offer a 14-day free trial with no credit card required. You can explore all the features...",
      },
      {
        timestamp: "00:01:15",
        speaker: "Customer",
        message: "Perfect. I'll definitely give it a try.",
      },
      {
        timestamp: "00:01:18",
        speaker: "Sales Rep",
        message:
          "Fantastic! I'll send you the details to get started with your trial. If you have any questions during...",
      },
      {
        timestamp: "00:01:25",
        speaker: "Customer",
        message: "Thanks, I appreciate that.",
      },
      {
        timestamp: "00:01:27",
        speaker: "Sales Rep",
        message:
          "You're welcome! I look forward to hearing your thoughts. Have a great day!",
      },
      {
        timestamp: "00:01:30",
        speaker: "Customer",
        message: "You too, thanks.",
      },
    ],
  };

  const convertFileContentToJson = async () => {
    try {
      // Placeholder JSON object for example
      setJsonContent(jsonObject);
    } catch (error) {
      console.error("Conversion failed:", error);
      setError("Failed to convert text to JSON.");
    }
  };

  useEffect(() => {
    if (fileContent) {
      convertFileContentToJson();
    }
  }, [fileContent]);

  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  // Function to handle opening the comment box
  const handleOpenCommentBox = (index: number) => {
    setSelectedBoxIndex(index);
    setIsCommentBoxVisible(true);
  };

  // Function to handle closing the comment box
  const handleCloseCommentBox = () => {
    setIsCommentBoxVisible(false);
    setSelectedBoxIndex(null);
  };

  const handleCommentSubmit = () => {
    if (jsonContent && selectedBoxIndex !== null) {
      // Check if the selectedBoxIndex is within bounds
      if (
        selectedBoxIndex >= 0 &&
        selectedBoxIndex < jsonContent.conversation.length
      ) {
        // Clone jsonContent to avoid direct mutation
        const updatedContent = { ...jsonContent };
        updatedContent.conversation[selectedBoxIndex] = {
          ...updatedContent.conversation[selectedBoxIndex],
          comment: comment,
        };
        setJsonContent(updatedContent);
      }
    }

    setComment(""); // Clear the comment
    handleCloseCommentBox(); // Close the comment box after submission
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Navbar />
      <Grid
        item
        xs={6}
        sx={{
          borderRight: "1px solid #ccc",
          height: "100%",
          overflowY: "auto",
          padding: 2,
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            File Viewer
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">File Name: {file?.name}</Typography>
              <Box sx={{ mt: 2 }}>
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <LinearProgress sx={{ width: "100%", mb: 2 }} />
                    <Typography variant="body1">Analyzing...</Typography>
                  </Box>
                ) : error ? (
                  <Typography variant="body1" color="error">
                    {error}
                  </Typography>
                ) : jsonContent && jsonContent.conversation ? (
                  <Box sx={{ padding: 2 }}>
                    {jsonContent.conversation.map(
                      (entry: ConversationEntry, index: number) => (
                        <Box
                          key={index}
                          sx={{
                            borderLeft: `4px solid ${
                              index % 2 === 0 ? "green" : "orange"
                            }`,
                            borderRadius: 1,
                            padding: 2,
                            marginBottom: 2,
                            backgroundColor: "#f9f9f9",
                            "&:hover .comment-icon": {
                              display: "block",
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                          >
                            {entry.speaker}{" "}
                            <span style={{ color: "grey" }}>
                              ({entry.timestamp})
                            </span>
                          </Typography>
                          <Typography variant="body1" sx={{ marginTop: 1 }}>
                            {entry.message}
                          </Typography>
                          <IconButton
                            className="comment-icon"
                            sx={{
                              display: "none",
                            }}
                            onClick={() => handleOpenCommentBox(index)}
                          >
                            <CommentIcon />
                          </IconButton>
                          <Modal
                            open={isCommentBoxVisible}
                            onClose={handleCloseCommentBox}
                            aria-labelledby="comment-box-title"
                            aria-describedby="comment-box-description"
                          >
                            <Box
                              key={1}
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                              }}
                            >
                              <h2 id="comment-box-title">Leave a Comment</h2>
                              <TextField
                                fullWidth
                                label="Comment"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                              <Box
                                mt={2}
                                display="flex"
                                justifyContent="space-between"
                              >
                                <Button
                                  variant="contained"
                                  onClick={() => handleCommentSubmit()}
                                >
                                  Submit
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={handleCloseCommentBox}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                        </Box>
                      )
                    )}
                  </Box>
                ) : (
                  <LinearProgress sx={{ width: "100%" }} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Comments
        </Typography>
        <Card>
          <CardContent>
            {jsonContent && jsonContent.conversation ? (
              <Box>
                {jsonContent.conversation.map(
                  (entry: ConversationEntry, index: number) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      {entry.comment && (
                        <Box
                          sx={{
                            padding: 2,
                            borderRadius: 1,
                            border: "1px solid #ddd",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Typography variant="body2" sx={{ fontSize: "15px" }}>
                            {entry.message}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "10px", fontWeight: "bold", mt: 1 }}
                          >
                            Comment for "{entry.speaker}" at {entry.timestamp}
                          </Typography>
                          <Box
                            sx={{
                              padding: 2,
                              borderRadius: 1,
                              border: "1px solid #ddd",
                              backgroundColor: "#f1f1f1",
                              mt: 1,
                            }}
                          >
                            <Typography variant="body1" sx={{}}>
                              {entry.comment}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )
                )}
              </Box>
            ) : (
              <Typography variant="body1">No comments available.</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default SalesScriptContainer;
