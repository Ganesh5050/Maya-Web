// OpenAI API Configuration
export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',
  models: {
    // Free models (what you're using)
    text: 'gpt-3.5-turbo',
    image: 'dall-e-2',
    voice: 'whisper-1',
    tts: 'tts-1',
    vision: 'gpt-4-vision-preview',
    
    // Paid models (for future upgrade)
    // text: 'gpt-4-turbo',
    // image: 'dall-e-3',
    // tts: 'tts-1-hd'
  },
  limits: {
    maxTokens: 1000, // Free tier limit
    maxImages: 1, // Free tier limit
    maxRequests: 3, // Free tier limit per minute
  }
};

// OpenAI Service Class
export class OpenAIService {
  private static config = OPENAI_CONFIG;

  static async generateText(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.models.text,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.config.limits.maxTokens,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Fallback to mock response for development
      return this.getMockResponse(prompt);
    }
  }

  static async generateImage(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.models.image,
          prompt: prompt,
          n: this.config.limits.maxImages,
          size: '512x512',
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data[0].url;
    } catch (error) {
      console.error('OpenAI Image API Error:', error);
      // Fallback to placeholder image
      return '/placeholder-image.jpg';
    }
  }

  static async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob);
      formData.append('model', this.config.models.voice);

      const response = await fetch(`${this.config.baseURL}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('OpenAI Whisper API Error:', error);
      // Fallback to mock transcription
      return 'Mock transcription: ' + Math.random().toString(36).substring(7);
    }
  }

  static async synthesizeSpeech(text: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/audio/speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.models.tts,
          input: text,
          voice: 'alloy',
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('OpenAI TTS API Error:', error);
      // Fallback to browser TTS
      return '';
    }
  }

  static async analyzeImage(imageFile: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('model', this.config.models.vision);
      formData.append('prompt', 'Analyze this image and extract design system information including colors, fonts, layout, and visual elements. Return structured data.');

      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`OpenAI Vision API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI Vision API Error:', error);
      // Fallback to mock analysis
      return this.getMockImageAnalysis();
    }
  }

  // Mock responses for development/fallback
  private static getMockResponse(prompt: string): string {
    const mockResponses = [
      'I understand you want to create a website. Let me help you with that.',
      'This is a mock response for development purposes.',
      'Your request has been processed successfully.',
      'I can help you build amazing websites with AI.',
      'Let me generate some content for your website.',
    ];
    
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  // Mock image analysis for development/fallback
  private static getMockImageAnalysis(): any {
    return {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280'
      },
      typography: {
        fontFamily: 'Inter',
        h1: { fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2' },
        body: { fontSize: '1rem', fontWeight: '400', lineHeight: '1.6' }
      },
      spacing: {
        xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem', '2xl': '4rem'
      },
      components: {
        button: { backgroundColor: '#6366f1', textColor: '#ffffff', borderRadius: '0.5rem' },
        card: { backgroundColor: '#ffffff', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }
      }
    };
  }

  // Check API status
  static async checkAPIStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('OpenAI API Status Check Failed:', error);
      return false;
    }
  }

  // Get usage statistics
  static async getUsageStats(): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseURL}/usage`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('OpenAI Usage Stats Error:', error);
      return {
        total_usage: 0,
        total_cost: 0,
        free_tier_remaining: 1000
      };
    }
  }
}

export default OpenAIService;
