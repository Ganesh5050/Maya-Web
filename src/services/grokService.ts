import OpenAI from 'openai';

// Initialize xAI Grok
const API_KEY = import.meta.env.VITE_XAI_API_KEY;
if (!API_KEY) {
  throw new Error('Missing VITE_XAI_API_KEY environment variable');
}
const xai = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

export interface WebsiteGenerationRequest {
  prompt: string;
  type?: string;
}

export interface GeneratedWebsiteCode {
  html: string;
  css: string;
  javascript: string;
  title: string;
  description: string;
  features: string[];
  sections: string[];
  primaryColor: string;
  secondaryColor: string;
}

export const grokService = {
  async generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsiteCode> {
    try {
      console.log("🚀 Calling xAI Grok - Creative & Fast!");

      const completion = await xai.chat.completions.create({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: "You are Grok, an expert web developer who creates stunning, modern websites. Be creative and professional. Generate COMPLETE working code with NO placeholders."
          },
          {
            role: "user",
            content: `Generate a complete, professional, creative website for: "${request.prompt}"

REQUIREMENTS:
1. COMPLETE code - NO placeholders or "add more here" comments
2. Modern, responsive design with Tailwind CSS
3. Creative animations and transitions
4. Fully responsive (mobile, tablet, desktop)
5. Modern UI: hero section, features, testimonials, CTA
6. Semantic HTML5
7. Interactive JavaScript
8. Professional color scheme
9. Real, engaging content

FORMAT RESPONSE EXACTLY:

===HTML===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEBSITE_TITLE</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom CSS */
    </style>
</head>
<body>
    <!-- Complete HTML body -->
</body>
</html>

===CSS===
/* Additional custom CSS */

===JAVASCRIPT===
// Complete JavaScript code

===METADATA===
{
  "title": "Creative Website Title",
  "description": "Compelling description",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "sections": ["hero", "features", "about", "testimonials", "contact"],
  "primaryColor": "#3b82f6",
  "secondaryColor": "#8b5cf6"
}

Generate NOW - be creative and amazing!`
          }
        ],
        temperature: 0.8,
        max_tokens: 8000
      });

      const response = completion.choices[0]?.message?.content || "";
      console.log("✅ Grok responded successfully!");

      // Parse the response
      const htmlMatch = response.match(/===HTML===\s*([\s\S]*?)(?:===CSS===|$)/);
      const cssMatch = response.match(/===CSS===\s*([\s\S]*?)(?:===JAVASCRIPT===|$)/);
      const jsMatch = response.match(/===JAVASCRIPT===\s*([\s\S]*?)(?:===METADATA===|$)/);
      const metadataMatch = response.match(/===METADATA===\s*([\s\S]*?)$/);

      let metadata = {
        title: "Grok Generated Website",
        description: "A creative website built by Grok AI",
        features: ["Responsive Design", "Modern UI", "Fast Performance", "SEO Optimized", "Mobile Friendly", "Interactive"],
        sections: ["hero", "features", "about", "contact"],
        primaryColor: "#3b82f6",
        secondaryColor: "#8b5cf6"
      };

      if (metadataMatch && metadataMatch[1]) {
        try {
          const metaText = metadataMatch[1].trim();
          const jsonMatch = metaText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            metadata = { ...metadata, ...JSON.parse(jsonMatch[0]) };
          }
        } catch (e) {
          console.warn("Failed to parse metadata, using defaults");
        }
      }

      const html = htmlMatch ? htmlMatch[1].trim() : '<div>Error generating HTML</div>';
      const css = cssMatch ? cssMatch[1].trim() : '';
      const javascript = jsMatch ? jsMatch[1].trim() : '';

      return {
        html,
        css,
        javascript,
        ...metadata
      };

    } catch (error) {
      console.error("❌ Grok API Error:", error);
      throw error;
    }
  },

  async modifyWebsite(currentHTML: string, instruction: string): Promise<string> {
    try {
      console.log("🚀 Modifying website with Grok AI...");

      const completion = await xai.chat.completions.create({
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content: "You are Grok, a web developer who modifies websites creatively."
          },
          {
            role: "user",
            content: `Modify this website based on the instruction.

CURRENT HTML:
${currentHTML}

INSTRUCTION: ${instruction}

Return ONLY the complete modified HTML, no explanations.`
          }
        ],
        temperature: 0.7,
        max_tokens: 8000
      });

      const response = completion.choices[0]?.message?.content || currentHTML;
      console.log("✅ Website modified by Grok!");
      return response;

    } catch (error) {
      console.error("❌ Grok modification error:", error);
      throw error;
    }
  }
};

