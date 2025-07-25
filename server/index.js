// server/index.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recommend", async (req, res) => {
  const userPrompt = req.body.prompt;

  console.log("Received user prompt:", userPrompt);

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [{ role: "user", content: userPrompt }],
        max_tokens: 300,
        temperature: 0.7,
      }),
    }
  );

  const data = await response.json();
  console.log(data);
  res.json({
    reply: data.choices?.[0]?.message?.content || "Received no response.",
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
