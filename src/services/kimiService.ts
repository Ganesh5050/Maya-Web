import OpenAI from 'openai';

// Initialize Kimi AI (Moonshot)
const API_KEY = "sk-m6JDP0gKP939Yxd90xSpV6JGkyzNWqZkSfamCcwz1EA7KpIU";
const kimi = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://api.moonshot.cn/v1",
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

export const kimiService = {
  async generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsiteCode> {
    try {
      console.log("🌙 Calling Kimi AI (Moonshot) - Long Context Master!");

      const completion = await kimi.chat.completions.create({
        model: "moonshot-v1-8k",
        messages: [
          {
            role: "system",
            content: "You are Kimi, an expert web developer who creates beautiful, comprehensive websites. Generate COMPLETE working code with NO placeholders. Be detailed and thorough."
          },
          {
            role: "user",
            content: `Generate a complete, professional, comprehensive website for: "${request.prompt}"

REQUIREMENTS:
1. COMPLETE code - NO placeholders, all sections finished
2. Modern, responsive design using Tailwind CSS
3. Beautiful animations and smooth transitions
4. Fully responsive (mobile, tablet, desktop)
5. Comprehensive UI: hero, features, about, testimonials, pricing, CTA, footer
6. Semantic HTML5 with full accessibility
7. Rich interactive JavaScript elements
8. Elegant color scheme and typography
9. Real, detailed content throughout
10. Professional, polished result

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
        /* Beautiful custom CSS with animations */
    </style>
</head>
<body>
    <!-- Complete, comprehensive HTML body -->
</body>
</html>

===CSS===
/* Additional beautiful CSS styles */

===JAVASCRIPT===
// Complete, rich JavaScript code

===METADATA===
{
  "title": "Professional Website Title",
  "description": "Detailed, compelling description",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "sections": ["hero", "features", "about", "testimonials", "pricing", "contact"],
  "primaryColor": "#3b82f6",
  "secondaryColor": "#8b5cf6"
}

Generate a comprehensive, beautiful website NOW!`
          }
        ],
        temperature: 0.7,
        max_tokens: 8000
      });

      const response = completion.choices[0]?.message?.content || "";
      console.log("✅ Kimi responded successfully!");

      // Parse the response
      const htmlMatch = response.match(/===HTML===\s*([\s\S]*?)(?:===CSS===|$)/);
      const cssMatch = response.match(/===CSS===\s*([\s\S]*?)(?:===JAVASCRIPT===|$)/);
      const jsMatch = response.match(/===JAVASCRIPT===\s*([\s\S]*?)(?:===METADATA===|$)/);
      const metadataMatch = response.match(/===METADATA===\s*([\s\S]*?)$/);

      let metadata = {
        title: "Kimi Generated Website",
        description: "A beautiful website built by Kimi AI",
        features: ["Responsive Design", "Modern UI", "Fast Performance", "SEO Optimized", "Mobile Friendly", "Interactive"],
        sections: ["hero", "features", "about", "testimonials", "contact"],
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
      console.error("❌ Kimi API Error:", error);
      throw error;
    }
  },

  async modifyWebsite(currentHTML: string, instruction: string): Promise<string> {
    try {
      console.log("🌙 Modifying website with Kimi AI...");

      const completion = await kimi.chat.completions.create({
        model: "moonshot-v1-8k",
        messages: [
          {
            role: "system",
            content: "You are Kimi, a web developer who modifies websites comprehensively."
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
      console.log("✅ Website modified by Kimi!");
      return response;

    } catch (error) {
      console.error("❌ Kimi modification error:", error);
      throw error;
    }
  }
};

