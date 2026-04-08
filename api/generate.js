// api/generate.js
export default async function handler(req, res) {
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
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    const data = await response.json();
    if (!data.choices || !data.choices[0].message) {
      throw new Error("No choices returned from OpenAI");
    }

    res.status(200).json({ result: data.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error calling OpenAI API' });
  }
}