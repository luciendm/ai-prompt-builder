export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch(httpsapi.openai.comv1chatcompletions, {
      method POST,
      headers {
        Content-Type applicationjson,
        Authorization `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body JSON.stringify({
        model gpt-4,
        messages [{ role user, content prompt }],
        temperature 0.3
      })
    });

    const data = await response.json();

    return res.status(200).json({
      result data.choices.[0].message.content  No response
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error Server error });
  }
}