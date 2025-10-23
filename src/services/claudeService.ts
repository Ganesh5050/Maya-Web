import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude AI
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || 'placeholder-key';
const anthropic = new Anthropic({
  apiKey: API_KEY,
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

export const claudeService = {
  async generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsiteCode> {
    try {
      console.log("🧠 Calling Claude AI (Sonnet 3.5) - Most Intelligent!");

      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8000,
        temperature: 0.7,
        system: "You are Claude, an expert web developer who creates exceptional, professional websites. Generate COMPLETE working code with NO placeholders. Be thorough and precise.",
        messages: [
          {
            role: "user",
            content: `Generate a complete, professional, exceptional website for: "${request.prompt}"

CRITICAL REQUIREMENTS:
1. COMPLETE code - NO placeholders, NO "add more content" comments
2. Modern, responsive design using Tailwind CSS
3. Sophisticated animations and smooth transitions
4. Fully responsive (mobile, tablet, desktop)
5. Professional UI: hero section, features, testimonials, CTA, footer
6. Semantic HTML5 with proper accessibility
7. Interactive JavaScript elements
8. Professional color scheme and typography
9. Real, compelling content (not lorem ipsum)
10. Follow web best practices

FORMAT YOUR RESPONSE EXACTLY:

===HTML===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEBSITE_TITLE</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom CSS with animations */
    </style>
</head>
<body>
    <!-- Complete, professional HTML body with all sections -->
</body>
</html>

===CSS===
/* Additional sophisticated CSS styles and animations */

===JAVASCRIPT===
// Complete JavaScript code for all interactive elements

===METADATA===
{
  "title": "Professional Website Title",
  "description": "A compelling, detailed description of the website",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "sections": ["hero", "features", "about", "testimonials", "pricing", "contact"],
  "primaryColor": "#3b82f6",
  "secondaryColor": "#8b5cf6"
}

Generate a truly exceptional, professional website NOW!`
          }
        ]
      });

      const response = message.content[0].type === 'text' ? message.content[0].text : "";
      console.log("✅ Claude responded successfully!");

      // Parse the response
      const htmlMatch = response.match(/===HTML===\s*([\s\S]*?)(?:===CSS===|$)/);
      const cssMatch = response.match(/===CSS===\s*([\s\S]*?)(?:===JAVASCRIPT===|$)/);
      const jsMatch = response.match(/===JAVASCRIPT===\s*([\s\S]*?)(?:===METADATA===|$)/);
      const metadataMatch = response.match(/===METADATA===\s*([\s\S]*?)$/);

      let metadata = {
        title: "Claude Generated Website",
        description: "A professional website built by Claude AI",
        features: ["Responsive Design", "Modern UI", "Fast Performance", "SEO Optimized", "Accessible", "Interactive"],
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
      console.error("❌ Claude API Error:", error);
      throw error;
    }
  },

  async modifyWebsite(currentHTML: string, instruction: string): Promise<string> {
    try {
      console.log("🧠 Modifying website with Claude AI...");

      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8000,
        temperature: 0.5,
        system: "You are Claude, a web developer who modifies websites precisely based on instructions.",
        messages: [
          {
            role: "user",
            content: `Modify this website based on the instruction.

CURRENT HTML:
${currentHTML}

INSTRUCTION: ${instruction}

Return ONLY the complete modified HTML with the changes applied. No explanations.`
          }
        ]
      });

      const response = message.content[0].type === 'text' ? message.content[0].text : currentHTML;
      console.log("✅ Website modified by Claude!");
      return response;

    } catch (error) {
      console.error("❌ Claude modification error:", error);
      throw error;
    }
  }
};

