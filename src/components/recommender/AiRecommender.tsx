import axios from "axios";
import { useState } from "react";

export const AiRecommender = () => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:4000/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    // console.log("Response:", res.json());
    const data = await res.json();
    console.log(data);
    setReply(data.reply);
  };

  const handleSubmit2 = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: 'gpt-3.5-turbo',
          messages: [{ role: "user", content: prompt }],
          model: "mistralai/mistral-7b-instruct", // oder z.B. openchat
          // messages: [{ role: "user", content: userPrompt }],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error from OpenAI:", error);
      //   return "Something went wrong...";
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-2">KI-Filmvorschläge</h1>
      <input
        type="text"
        placeholder="Sag etwas wie: Ich mag Interstellar"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Vorschlagen lassen
      </button>
      {reply && (
        <div className="mt-4 whitespace-pre-line bg-gray-100 p-4 rounded">
          {reply}
        </div>
      )}
    </div>
  );
};
