// SECURE VERSION - Calls backend API route instead of exposing API key in browser

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

export const geminiService = {
  async generateWebsite(request: WebsiteGenerationRequest): Promise<GeneratedWebsiteCode> {
    try {
      const uniqueSeed = Date.now().toString(36).slice(-4);
      
      const fullPrompt = `You are an expert full-stack web developer and UI/UX designer. 

Create a COMPLETELY UNIQUE website for: "${request.prompt}" [Seed: ${uniqueSeed}]

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

Now create a STUNNING, PROFESSIONAL website for: "${request.prompt}"

🎨 DESIGN EXCELLENCE:
- Modern gradients, glassmorphism effects, smooth animations
- Professional typography with proper hierarchy
- Industry-appropriate color psychology
- Micro-interactions (hover effects, transitions)
- Generous whitespace for premium feel
- Creative use of emojis/Unicode symbols
- Clear, compelling CTAs with high contrast

💻 TECHNICAL MASTERY:
- Tailwind CSS for ALL styling (utility-first approach)
- Mobile-first responsive design (perfect on all devices)
- Semantic HTML5 (header, nav, main, section, footer)
- WCAG 2.1 AA accessibility compliance
- SEO optimized (meta tags, heading hierarchy)
- Modern vanilla JavaScript (smooth scroll, animations)
- Performance optimized (fast load times)

📝 COMPELLING CONTENT:
- REAL, persuasive copy (NO lorem ipsum!)
- Industry-specific terminology
- Attention-grabbing headlines
- Benefits-focused descriptions
- Social proof elements (testimonials, statistics)
- Clear value propositions

🏗️ COMPLETE STRUCTURE:
- Hero section with powerful headline + CTA
- Features/Benefits grid (6+ items)
- About/Story section
- Testimonials/Social Proof
- Pricing/Packages (if applicable)
- FAQ section
- Contact/CTA section
- Professional footer

CRITICAL: Generate COMPLETE, PRODUCTION-READY code. NO placeholders!

STRUCTURE YOUR RESPONSE EXACTLY LIKE THIS:

===HTML===
[Complete HTML code here - full page with proper structure]

===CSS===
[Complete CSS code here - all styling including animations]

===JAVASCRIPT===
[Complete JavaScript code here - all interactivity]

===METADATA===
{
  "title": "Website Title",
  "description": "Website description",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "sections": ["hero", "features", "about", "testimonials", "contact"],
  "primaryColor": "#hex",
  "secondaryColor": "#hex"
}

Now generate the complete website!`;

      console.log("💎 Calling Gemini AI via secure backend...");

      // Call our secure backend API route
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          temperature: 0.8,
          model: "gemini-2.0-flash-exp"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Backend API request failed');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "";
      console.log("✅ Gemini responded successfully!");

      // Parse sections
      const htmlMatch = aiResponse.match(/===HTML===\s*([\s\S]*?)(?:===CSS===|$)/);
      const cssMatch = aiResponse.match(/===CSS===\s*([\s\S]*?)(?:===JAVASCRIPT===|$)/);
      const jsMatch = aiResponse.match(/===JAVASCRIPT===\s*([\s\S]*?)(?:===METADATA===|$)/);
      const metadataMatch = aiResponse.match(/===METADATA===\s*([\s\S]*?)$/);

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
      console.error("❌ Gemini API Error:", error);
      throw error;
    }
  },

  async modifyWebsite(currentHTML: string, instruction: string): Promise<string> {
    try {
      console.log("💎 Modifying website with Gemini AI...");

      const prompt = `You are a web developer who modifies websites based on instructions.

CURRENT HTML:
${currentHTML}

INSTRUCTION: ${instruction}

Return ONLY the complete modified HTML code, no explanations or markdown.`;

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.5,
          model: "gemini-2.0-flash-exp"
        })
      });

      if (!response.ok) {
        throw new Error('Backend API request failed');
      }

      const data = await response.json();
      const modifiedHTML = data.candidates[0]?.content?.parts[0]?.text || currentHTML;
      console.log("✅ Website modified successfully!");
      return modifiedHTML;

    } catch (error) {
      console.error("❌ Gemini modification error:", error);
      throw error;
    }
  }
};
