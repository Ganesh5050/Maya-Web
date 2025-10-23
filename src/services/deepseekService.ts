import OpenAI from 'openai';

// Initialize DeepSeek AI
const API_KEY = "sk-a177fb9e230b48408529b5a7cac20834";
const deepseek = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://api.deepseek.com",
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

export const deepseekService = {
  async generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsiteCode> {
    try {
      console.log("🔷 Calling DeepSeek AI - Smart & Efficient!");

      const completion = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are DeepSeek, an expert web developer who creates high-quality, efficient websites. Generate COMPLETE working code with NO placeholders. Be smart and thorough."
          },
          {
            role: "user",
            content: `Generate a complete, professional, high-quality website for: "${request.prompt}"

REQUIREMENTS:
1. COMPLETE code - NO placeholders or incomplete sections
2. Modern, responsive design using Tailwind CSS
3. Smooth animations and elegant transitions
4. Fully responsive (mobile, tablet, desktop)
5. Professional UI: hero, features, testimonials, CTA, footer
6. Semantic HTML5 with accessibility
7. Interactive JavaScript elements
8. Beautiful color scheme and typography
9. Real, meaningful content
10. Clean, efficient code

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
        /* Custom CSS with smooth animations */
    </style>
</head>
<body>
    <!-- Complete HTML body with all sections -->
</body>
</html>

===CSS===
/* Additional elegant CSS styles */

===JAVASCRIPT===
// Complete JavaScript for interactivity

===METADATA===
{
  "title": "Professional Website Title",
  "description": "Compelling website description",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "sections": ["hero", "features", "about", "testimonials", "contact"],
  "primaryColor": "#3b82f6",
  "secondaryColor": "#8b5cf6"
}

Generate an efficient, professional website NOW!`
          }
        ],
        temperature: 0.7,
        max_tokens: 8000
      });

      const response = completion.choices[0]?.message?.content || "";
      console.log("✅ DeepSeek responded successfully!");

      // Parse the response
      const htmlMatch = response.match(/===HTML===\s*([\s\S]*?)(?:===CSS===|$)/);
      const cssMatch = response.match(/===CSS===\s*([\s\S]*?)(?:===JAVASCRIPT===|$)/);
      const jsMatch = response.match(/===JAVASCRIPT===\s*([\s\S]*?)(?:===METADATA===|$)/);
      const metadataMatch = response.match(/===METADATA===\s*([\s\S]*?)$/);

      let metadata = {
        title: "DeepSeek Generated Website",
        description: "A professional website built by DeepSeek AI",
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
      console.error("❌ DeepSeek API Error:", error);
      throw error;
    }
  },

  async modifyWebsite(currentHTML: string, instruction: string): Promise<string> {
    try {
      console.log("🔷 Modifying website with DeepSeek AI...");

      const completion = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are DeepSeek, a web developer who modifies websites efficiently."
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
        temperature: 0.6,
        max_tokens: 8000
      });

      const response = completion.choices[0]?.message?.content || currentHTML;
      console.log("✅ Website modified by DeepSeek!");
      return response;

    } catch (error) {
      console.error("❌ DeepSeek modification error:", error);
      throw error;
    }
  }
};

