import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key is configured
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  try {
    const { prompt, temperature, model } = req.body;

    // Validate request body
    if (!prompt) {
      return res.status(400).json({ error: 'Invalid request: prompt required' });
    }

    const modelName = model || 'gemini-2.0-flash-exp';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

    // Call Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: temperature || 2.0,
          topP: 1.0,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API Error:', error);
      return res.status(response.status).json({ 
        error: 'Gemini API request failed',
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

