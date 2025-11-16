// backend/controllers/aiController.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Corresponds to: POST /api/ai/:action
export const geminiAction = async (req, res) => {
  const { action } = req.params;
  const { text } = req.body; // The query text sent from the frontend

  if (!text) {
    return res.status(400).json({ message: 'Text is required in the request body.' });
  }

  let prompt = '';
  switch (action) {
    case 'summarize':
      prompt = `Summarize the following customer query in one concise sentence: "${text}"`;
      break;
    case 'draft-reply':
      prompt = `Draft a polite and helpful customer service reply for this query: "${text}"`;
      break;
    default:
      return res.status(400).json({ message: 'Invalid AI action.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    res.status(200).json({ result: response.text() });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ message: 'Failed to get response from AI.' });
  }
};