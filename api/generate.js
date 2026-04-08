// CommonJS version
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt' });
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || "No response from OpenAI";

    res.status(200).json({ result: aiText });

  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: 'Error calling OpenAI API' });
  }
};