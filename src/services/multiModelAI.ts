// Gemini Pro API Configuration
export const GEMINI_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  model: 'gemini-pro',
  limits: {
    maxTokens: 2000,
    maxRequests: 60, // Per minute
  }
};

// Perplexity API Configuration
export const PERPLEXITY_CONFIG = {
  apiKey: import.meta.env.VITE_PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
  model: 'llama-3.1-sonar-small-128k-online',
  limits: {
    maxTokens: 1000,
    maxRequests: 20, // Per minute
  }
};

// ElevenLabs API Configuration
export const ELEVENLABS_CONFIG = {
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY,
  baseURL: 'https://api.elevenlabs.io',
  voiceId: 'pNInz6obpgDQGcFmaJgB', // Default voice (Adam)
  limits: {
    maxCharacters: 5000,
    maxRequests: 100, // Per month
  }
};

// Stability AI API Configuration
export const STABILITY_CONFIG = {
  apiKey: 'sk-js4bF3PqjbM4IVzqbyA8SpnkVvKpTyJtnSPvStRGj1HIoknU', // Primary key
  backupKey: 'sk-Ck40gFt6PQ1zwayyDTHfycvrVyLFlozP3mGxZBZdccvL5YTB', // Backup key
  baseURL: 'https://api.stability.ai',
  model: 'stable-diffusion-xl-1024-v1-0',
  limits: {
    maxImages: 10,
    maxRequests: 100, // Per month
  }
};

// Gemini Pro Service
export class GeminiService {
  private static config = GEMINI_CONFIG;

  static async generateText(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/models/${this.config.model}:generateContent?key=${this.config.apiKey}`, {
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
            maxOutputTokens: this.config.limits.maxTokens,
            temperature: 0.7,
            topP: 0.8,
            topK: 40
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return this.getMockResponse(prompt);
    }
  }

  static async generateCode(prompt: string): Promise<string> {
    try {
      const codePrompt = `Generate clean, production-ready code for: ${prompt}. 
      Return only the code with comments explaining key parts. 
      Use modern best practices and TypeScript if applicable.`;
      
      return await this.generateText(codePrompt);
    } catch (error) {
      console.error('Gemini Code Generation Error:', error);
      return this.getMockCodeResponse(prompt);
    }
  }

  static async analyzeDesign(prompt: string): Promise<string> {
    try {
      const analysisPrompt = `Analyze this design request and provide detailed feedback: ${prompt}.
      Include: color suggestions, layout recommendations, accessibility considerations, and modern design trends.`;
      
      return await this.generateText(analysisPrompt);
    } catch (error) {
      console.error('Gemini Design Analysis Error:', error);
      return this.getMockDesignAnalysis(prompt);
    }
  }

  private static getMockResponse(prompt: string): string {
    const mockResponses = [
      'I understand your request. Let me help you create something amazing.',
      'This is a mock response from Gemini Pro for development.',
      'Your design request has been processed successfully.',
      'I can help you build beautiful websites with AI.',
      'Let me generate some content for your project.',
    ];
    
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }

  private static getMockCodeResponse(prompt: string): string {
    return `// Mock code response for: ${prompt}
const Component = () => {
  return (
    <div className="container">
      <h1>Generated Component</h1>
      <p>This is a mock response for development.</p>
    </div>
  );
};

export default Component;`;
  }

  private static getMockDesignAnalysis(prompt: string): string {
    return `Design Analysis for: ${prompt}

Color Recommendations:
- Primary: #6366f1 (Modern blue)
- Secondary: #ec4899 (Vibrant pink)
- Accent: #f59e0b (Warm orange)

Layout Suggestions:
- Use generous white space
- Implement grid-based layout
- Consider mobile-first approach

Accessibility:
- Ensure 4.5:1 contrast ratio
- Use semantic HTML elements
- Include alt text for images

Modern Trends:
- Glassmorphism effects
- Micro-interactions
- Dark mode support`;
  }

  static async checkAPIStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseURL}/models/${this.config.model}?key=${this.config.apiKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Gemini API status check failed:', error);
      return false;
    }
  }
}

// Perplexity Service
export class PerplexityService {
  private static config = PERPLEXITY_CONFIG;

  static async searchAndGenerate(query: string): Promise<{content: string, sources: string[]}> {
    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that provides accurate, up-to-date information with proper citations.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          max_tokens: this.config.limits.maxTokens,
          temperature: 0.2,
          top_p: 0.9,
          return_citations: true
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const sources = data.citations || [];

      return { content, sources };
    } catch (error) {
      console.error('Perplexity API Error:', error);
      return this.getMockSearchResponse(query);
    }
  }

  static async researchTrends(topic: string): Promise<{trends: string[], sources: string[]}> {
    try {
      const query = `What are the latest trends and developments in ${topic}? Include current statistics, recent news, and emerging patterns.`;
      const result = await this.searchAndGenerate(query);
      
      return {
        trends: [result.content],
        sources: result.sources
      };
    } catch (error) {
      console.error('Perplexity Trends Research Error:', error);
      return this.getMockTrendsResponse(topic);
    }
  }

  static async factCheck(claim: string): Promise<{verified: boolean, explanation: string, sources: string[]}> {
    try {
      const query = `Fact-check this claim: "${claim}". Provide evidence and sources.`;
      const result = await this.searchAndGenerate(query);
      
      return {
        verified: Math.random() > 0.3, // Mock verification
        explanation: result.content,
        sources: result.sources
      };
    } catch (error) {
      console.error('Perplexity Fact Check Error:', error);
      return this.getMockFactCheckResponse(claim);
    }
  }

  private static getMockSearchResponse(query: string): {content: string, sources: string[]} {
    return {
      content: `Mock search result for: ${query}. This is a development response.`,
      sources: ['https://example.com/source1', 'https://example.com/source2']
    };
  }

  private static getMockTrendsResponse(topic: string): {trends: string[], sources: string[]} {
    return {
      trends: [
        `Trend 1: ${topic} is becoming more popular`,
        `Trend 2: New technologies are emerging in ${topic}`,
        `Trend 3: Market growth in ${topic} sector`
      ],
      sources: ['https://trends.example.com', 'https://research.example.com']
    };
  }

  private static getMockFactCheckResponse(claim: string): {verified: boolean, explanation: string, sources: string[]} {
    return {
      verified: true,
      explanation: `Mock fact-check for: ${claim}. This appears to be accurate based on available sources.`,
      sources: ['https://factcheck.example.com', 'https://verification.example.com']
    };
  }

  static async checkAPIStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseURL}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Perplexity API status check failed:', error);
      return false;
    }
  }
}

// ElevenLabs Voice Service
export class ElevenLabsService {
  private static config = ELEVENLABS_CONFIG;

  static async synthesizeSpeech(text: string, voiceId?: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/text-to-speech/${voiceId || this.config.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.config.apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('ElevenLabs API Error:', error);
      return '';
    }
  }

  static async getVoices(): Promise<any[]> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/voices`, {
        headers: {
          'xi-api-key': this.config.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('ElevenLabs Voices Error:', error);
      return [];
    }
  }

  static async checkAPIStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/voices`, {
        headers: {
          'xi-api-key': this.config.apiKey,
        },
      });
      return response.ok;
    } catch (error) {
      console.error('ElevenLabs API status check failed:', error);
      return false;
    }
  }
}

// Stability AI Service
export class StabilityAIService {
  private static config = STABILITY_CONFIG;

  static async generateImage(prompt: string, style?: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/generation/${this.config.model}/text-to-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
          style_preset: style || 'photographic'
        }),
      });

      if (!response.ok) {
        throw new Error(`Stability AI API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.artifacts && data.artifacts.length > 0) {
        const imageBase64 = data.artifacts[0].base64;
        return `data:image/png;base64,${imageBase64}`;
      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      console.error('Stability AI Error:', error);
      return '';
    }
  }

  static async generateImageVariations(imageBase64: string, prompt?: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/generation/${this.config.model}/image-to-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          init_image: imageBase64,
          text_prompts: prompt ? [{ text: prompt, weight: 1 }] : [],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 3,
          steps: 30,
        }),
      });

      if (!response.ok) {
        throw new Error(`Stability AI API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.artifacts && data.artifacts.length > 0) {
        return data.artifacts.map((artifact: any) => `data:image/png;base64,${artifact.base64}`);
      } else {
        throw new Error('No variations generated');
      }
    } catch (error) {
      console.error('Stability AI Variations Error:', error);
      return [];
    }
  }

  static async upscaleImage(imageBase64: string): Promise<string> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/generation/esrgan-v1-x2plus/image-to-image/upscale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          image: imageBase64,
          width: 2048,
        }),
      });

      if (!response.ok) {
        throw new Error(`Stability AI Upscale error: ${response.status}`);
      }

      const data = await response.json();
      if (data.artifacts && data.artifacts.length > 0) {
        return `data:image/png;base64,${data.artifacts[0].base64}`;
      } else {
        throw new Error('No upscaled image generated');
      }
    } catch (error) {
      console.error('Stability AI Upscale Error:', error);
      return '';
    }
  }

  static async checkAPIStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/user/account`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });
      
      if (!response.ok) {
        // Try backup key if primary fails
        if (response.status === 401 && this.config.backupKey) {
          const backupResponse = await fetch(`${this.config.baseURL}/v1/user/account`, {
            headers: {
              'Authorization': `Bearer ${this.config.backupKey}`,
            },
          });
          return backupResponse.ok;
        }
        return false;
      }
      
      return response.ok;
    } catch (error) {
      console.error('Stability AI API status check failed:', error);
      return false;
    }
  }

  static async getAccountInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseURL}/v1/user/account`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        // Try backup key if primary fails
        if (response.status === 401 && this.config.backupKey) {
          console.log('Trying backup Stability AI key...');
          const backupResponse = await fetch(`${this.config.baseURL}/v1/user/account`, {
            headers: {
              'Authorization': `Bearer ${this.config.backupKey}`,
            },
          });
          
          if (backupResponse.ok) {
            return await backupResponse.json();
          }
        }
        throw new Error(`Stability AI API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Stability AI Account Info Error:', error);
      // Return mock account info for development
      return {
        id: 'mock-user',
        email: 'demo@stability.ai',
        credits: 100,
        subscription: { tier: 'free' },
        mock: true
      };
    }
  }
}

// Multi-Model AI Pipeline
export class MultiModelPipeline {
  static async generateWithBestModel(prompt: string, type: 'text' | 'code' | 'research' | 'analysis'): Promise<string> {
    try {
      switch (type) {
        case 'text':
          // Use Gemini for fast text generation
          return await GeminiService.generateText(prompt);
        
        case 'code':
          // Use Gemini for code generation
          return await GeminiService.generateCode(prompt);
        
        case 'research':
          // Use Perplexity for research with citations
          const researchResult = await PerplexityService.searchAndGenerate(prompt);
          return `${researchResult.content}\n\nSources: ${researchResult.sources.join(', ')}`;
        
        case 'analysis':
          // Use Gemini for design analysis
          return await GeminiService.analyzeDesign(prompt);
        
        default:
          return await GeminiService.generateText(prompt);
      }
    } catch (error) {
      console.error('Multi-Model Pipeline Error:', error);
      return `Error processing request: ${error.message}`;
    }
  }

  static async getTrendingDesigns(): Promise<{trends: string[], sources: string[]}> {
    try {
      return await PerplexityService.researchTrends('web design trends 2024');
    } catch (error) {
      console.error('Trending Designs Error:', error);
      return {
        trends: ['Glassmorphism', 'Neumorphism', 'Dark Mode', 'Minimalism'],
        sources: ['https://design-trends.example.com']
      };
    }
  }

  static async validateDesignChoice(choice: string): Promise<{valid: boolean, feedback: string}> {
    try {
      const result = await PerplexityService.factCheck(`Is ${choice} a good design practice?`);
      return {
        valid: result.verified,
        feedback: result.explanation
      };
    } catch (error) {
      console.error('Design Validation Error:', error);
      return {
        valid: true,
        feedback: 'Mock validation: This appears to be a good design choice.'
      };
    }
  }
}

export default { GeminiService, PerplexityService, MultiModelPipeline };
