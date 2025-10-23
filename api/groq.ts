import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key is configured
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ API key not configured' });
  }

  try {
    const { messages, model, temperature, max_tokens } = req.body;

    // Validate request body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages required' });
    }

    // Call GROQ API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages,
        temperature: temperature || 1.0,
        max_tokens: max_tokens || 8000,
        top_p: 1.0,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GROQ API Error:', error);
      return res.status(response.status).json({ 
        error: 'GROQ API request failed',
        details: error 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

