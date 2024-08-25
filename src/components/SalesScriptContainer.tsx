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
} from "@mui/material";
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

  const convertFileContentToJson = async () => {
    try {
      // Example conversion logic, replace with actual implementation
      // const jsonData = await convertTextToJson(fileContent);
      // const data = JSON.parse(jsonData) as JsonContent;
      // Ensure jsonContent is not null or undefined
      // if (data && Array.isArray(data.conversation)) {
      //   setJsonContent(data);
      // } else {
      //   setError("Invalid JSON structure.");
      // }

      // Placeholder JSON object
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

  useEffect(() => {
    if (jsonContent) {
      console.log("Updated JSON content:", jsonContent);
    }
  }, [jsonContent]);

  interface ConversationEntry {
    speaker: string;
    timestamp: string;
    message: string;
  }

  interface JsonContent {
    conversation: ConversationEntry[];
  }

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* 1st Container: Menu Bar */}
      <Navbar />
      <Grid
        item
        xs={6}
        sx={{
          borderRight: "1px solid #ccc",
          height: "100%", // Use full height
          overflowY: "auto", // Enable scrolling
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
      {/* 3rd Container: Comments & Summary */}
      <Grid item xs={4} sx={{ padding: 2 }}>
        <Box>
          <Typography variant="h5">Comments</Typography>
          {/* Render comments here */}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Summary</Typography>
          {/* Render summary here */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SalesScriptContainer;
