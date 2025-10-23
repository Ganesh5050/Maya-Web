import Groq from "groq-sdk";

// Initialize Groq with API key
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
if (!API_KEY) {
  throw new Error('Missing VITE_GROQ_API_KEY environment variable');
}
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

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
  // Multi-file project structure (like Bolt.new)
  files?: {
    [key: string]: {
      content: string;
      language: string;
    }
  };
  framework?: string; // React, Vue, Vanilla, etc.
}

export const groqService = {
  async generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsiteCode> {
    try {
      console.log("⚡ Calling GROQ AI (Llama 3.3) - ULTRA FAST & FREE!");

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert full-stack web developer and UI/UX designer. You create stunning, production-ready websites that look like they cost $10,000+.

YOUR EXPERTISE:
- Modern design trends (glassmorphism, gradients, micro-interactions)
- Accessibility (WCAG 2.1 AA compliance)
- Performance optimization (fast load times)
- Responsive design (mobile-first approach)
- SEO best practices
- Professional copywriting

NEVER use placeholders or comments like "add more content here". Every section must be COMPLETE and FUNCTIONAL.`
          },
          {
            role: "user",
            content: `Create a COMPLETELY UNIQUE website for: "${request.prompt}" [Seed: ${Date.now().toString(36).slice(-4)}]

⚠️ CRITICAL: This website MUST be UNIQUE - analyze "${request.prompt}" carefully and create something SPECIFIC to it!

🚫 ABSOLUTELY FORBIDDEN (DO NOT GENERATE THESE):
- ❌ Title like "Coffe Websote", "Ok Website", "Modern Website"  
- ❌ Text like "Modern Design", "User-Friendly", "Transform your workflow"
- ❌ Generic purple/blue gradients (#8b5cf6, #3b82f6)
- ❌ Badge text like "Modern Website", "Powerful Features"
- ❌ CTA text like "Get Started Free", "Learn More" (unless specific)
- ❌ ANY generic template content

✅ YOU MUST GENERATE:
1. **SPECIFIC TITLE**: Based on "${request.prompt}" (e.g., "Brew Haven Cafe" for coffee shop, "Urban Kicks" for sneakers)
2. **INDUSTRY COLORS**: Match "${request.prompt}" (coffee=brown/cream, sneakers=black/red, nature=green, tech=blue)
3. **REAL CONTENT**: Specific to "${request.prompt}" (coffee: "Espresso, Latte, Cappuccino", NOT "Feature 1, Feature 2")
4. **SPECIFIC FEATURES**: What makes sense for "${request.prompt}" (coffee: menu, hours, location, NOT generic features)
5. **UNIQUE DESIGN**: Make it look DIFFERENT from any template

Create a STUNNING, PROFESSIONAL website for: "${request.prompt}"

🎨 DESIGN REQUIREMENTS:
1. **Visual Excellence**: Use modern gradients, subtle shadows, smooth animations
2. **Professional Typography**: Proper font hierarchy, readable line heights
3. **Color Psychology**: Choose colors that match the industry/purpose
4. **Micro-interactions**: Hover effects, smooth transitions, button animations
5. **Whitespace**: Generous spacing for premium feel
6. **Icons & Visuals**: Use emojis or Unicode symbols creatively
7. **Call-to-Actions**: Clear, compelling CTAs with contrast

💻 TECHNICAL REQUIREMENTS:
1. **Tailwind CSS**: Use utility classes for ALL styling
2. **Responsive Design**: Mobile-first, looks perfect on all screen sizes
3. **Semantic HTML**: Proper tags (header, nav, main, section, article, footer)
4. **Accessibility**: ARIA labels, proper contrast, keyboard navigation
5. **Performance**: Optimized images, efficient JavaScript
6. **SEO**: Meta tags, proper headings hierarchy (h1 → h6)
7. **Modern JavaScript**: Smooth scrolling, lazy loading, animations

📝 CONTENT REQUIREMENTS:
1. Write REAL, compelling copy (NO lorem ipsum!)
2. Industry-specific terminology
3. Persuasive headlines that grab attention
4. Benefits-focused feature descriptions
5. Social proof elements (testimonials, stats)
6. Clear value propositions

🏗️ STRUCTURE REQUIREMENTS:
Include these sections (customize based on website type):
- Hero section with powerful headline + CTA
- Features/Benefits grid (minimum 6 features)
- About/Story section
- Testimonials/Social Proof
- Pricing/Packages (if applicable)
- FAQ section
- Contact/CTA section
- Professional footer with links

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

===HTML===
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEBSITE_TITLE</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Add any custom CSS here */
    </style>
</head>
<body>
    <!-- Complete HTML body with all sections -->
</body>
</html>

===CSS===
/* Additional custom CSS styles */

===JAVASCRIPT===
// Complete JavaScript code for interactivity

===METADATA===
{
  "title": "Amazing Website Title",
  "description": "A brief, compelling description of the website",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "sections": ["hero", "features", "about", "testimonials", "contact"],
  "primaryColor": "#3b82f6",
  "secondaryColor": "#8b5cf6"
}

Generate NOW - be creative and professional!`
          }
        ],
        model: "llama-3.3-70b-versatile", // ✅ Updated to latest model
        temperature: 0.7,
        max_tokens: 8000
      });

      const response = chatCompletion.choices[0]?.message?.content || "";
      console.log("✅ GROQ responded successfully!");

      // Parse the response
      const htmlMatch = response.match(/===HTML===\s*([\s\S]*?)(?:===CSS===|$)/);
      const cssMatch = response.match(/===CSS===\s*([\s\S]*?)(?:===JAVASCRIPT===|$)/);
      const jsMatch = response.match(/===JAVASCRIPT===\s*([\s\S]*?)(?:===METADATA===|$)/);
      const metadataMatch = response.match(/===METADATA===\s*([\s\S]*?)$/);

      let metadata = {
        title: "AI Generated Website",
        description: "A modern website built with AI",
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
      console.error("❌ GROQ API Error:", error);
      throw error;
    }
  },

  async modifyWebsite(currentHTML: string, instruction: string): Promise<string> {
    try {
      console.log("⚡ Modifying website with GROQ AI...");

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a web developer who modifies websites based on instructions."
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
        model: "llama-3.3-70b-versatile", // ✅ Updated to latest model
        temperature: 0.5,
        max_tokens: 8000
      });

      const response = chatCompletion.choices[0]?.message?.content || currentHTML;
      console.log("✅ Website modified successfully!");
      return response;

    } catch (error) {
      console.error("❌ GROQ modification error:", error);
      throw error;
    }
  }
};

