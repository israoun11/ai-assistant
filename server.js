const express = require("express");
require("dotenv").config();

const cors = require("cors");

const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const PORT = 5000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message: "AI Assistant API is running!",
  });
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        error: "Please provide a valid question.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: question.trim(),
    });

    res.json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    res.status(500).json({
      error: "Failed to get an AI response. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});