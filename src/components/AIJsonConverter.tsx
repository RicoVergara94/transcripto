import { OpenAI } from "openai";

// Initialize OpenAI client with environment variable for API key
const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true, // Use environment variable
});

export const convertTextToJson = async (text: string): Promise<any> => {
  console.log("stage1");
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Convert the following text into a JSON object:


          "lavuda": [
            {
              "timestamp": time ex:("00:00:00"),
              "speaker": "name",
              "message": "content"
            },
          ]
          `,
        },
        { role: "user", content: text },
      ],
      model: "gpt-4",
      stream: false,
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No choices returned from the OpenAI API.");
    }

    const jsonResult = completion.choices[0]?.message?.content;

    if (!jsonResult) {
      throw new Error("The result from OpenAI was null or undefined.");
    }

    // Parse JSON to ensure it's valid
    try {
      return jsonResult;
    } catch (error) {
      throw new Error("The result from OpenAI is not valid JSON.");
    }
  } catch (error) {
    console.error("Error converting text to JSON:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};
