const fs = require("fs");
const { Configuration, OpenAI } = require("openai");
require("dotenv").config();

// Initialize OpenAI API

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Read text file
const textFilePath = "./mock-transcript.txt";
const text = fs.readFileSync(textFilePath, "utf-8");

// Function to convert text to JSON using OpenAI API
async function convertTextToJson(text) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or any other model you prefer
      // prompt: `Convert the following text into a structured JSON format:\n\n${text}`,
      messages: [
        {
          role: "user",
          content: `Convert the following text into a structured JSON format:\n\n${text}`,
        },
      ],
      max_tokens: 1500, // Adjust as needed
    });

    // Process the response
    console.log("Raw response:", response.choices[0].message.content);

    let jsonString = response.choices[0].message.content.trim();
    jsonString = jsonString.replace(/^```json\s*|\s*```$/g, "");
    const jsonData = JSON.parse(jsonString);

    // Save JSON data to file
    const jsonFilePath = "./script.json";
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    console.log("Conversion successful! JSON file created at:", jsonFilePath);
  } catch (error) {
    console.error("Error converting text to JSON:", error);
  }
}

// Convert the text file to JSON
convertTextToJson(text);
