import React, { useState, useEffect } from "react";
import { convertTextToJson } from "./AIJsonConverter";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import * as mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

// Set the workerSrc for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const SalesScriptContainer = () => {
  const location = useLocation();
  const file = location.state?.file as File;

  const [fileContent, setFileContent] = useState<string | null>(null);
  const [jsonContent, setJsonContent] = useState<any | null>(null);
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
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
        setLoading(false);
      };

      if (file) {
        reader.readAsArrayBuffer(file);
      } else {
        setError("No file selected.");
        setLoading(false);
      }
    }
  }, [file]);

  // Use a separate effect to handle JSON conversion once fileContent is set
  useEffect(() => {
    if (fileContent) {
      const convertFileContentToJson = async () => {
        try {
          console.log("Starting conversion");
          const jsonData = await convertTextToJson(fileContent);
          const data = JSON.parse(jsonData);
          setJsonContent(data);
        } catch (error) {
          console.error("Conversion failed:", error);
          setError("Failed to convert text to JSON.");
        }
      };

      convertFileContentToJson();
    }
  }, [fileContent]);

  useEffect(() => {
    if (jsonContent) {
      console.log("Updated JSON content:", jsonContent);
    }
  }, [jsonContent]);

  return (
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
            ) : jsonContent ? (
              <Box
                component="pre"
                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {/* Display JSON data */}
                <Typography variant="body1">
                  {JSON.stringify(jsonContent, null, 2)}
                </Typography>
              </Box>
            ) : jsonContent ? (
              <Box
                component="pre"
                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {/* Display the file content */}
                <Typography variant="body1">{jsonContent}</Typography>
              </Box>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SalesScriptContainer;
