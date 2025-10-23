import Groq from "groq-sdk";

// Initialize Groq with API key
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || 'placeholder-key';
const groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

export interface MultiFileProject {
  title: string;
  description: string;
  framework: string; // "React" | "Vanilla" | "Vue"
  files: {
    [path: string]: {
      content: string;
      language: string; // "typescript" | "javascript" | "css" | "html" | "json"
    }
  };
  dependencies: { [key: string]: string };
  features: string[];
  primaryColor: string;
  secondaryColor: string;
}

export const advancedGroqService = {
  /**
   * Generate a complete multi-file project like Bolt.new
   */
  async generateProject(prompt: string, framework: string = "React"): Promise<MultiFileProject> {
    try {
      console.log(`⚡ Generating ${framework} project with GROQ AI...`);
      console.log(`📝 User prompt: "${prompt}"`);

      const systemPrompt = framework === "React" 
        ? this.getReactSystemPrompt()
        : this.getVanillaSystemPrompt();

      // Add randomization seed to ensure uniqueness
      const uniqueSeed = Date.now().toString(36).slice(-4);
      
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: `Create a COMPLETELY UNIQUE ${framework} website for: "${prompt}" [Seed: ${uniqueSeed}]

🎯 CRITICAL REQUIREMENTS:
1. **ANALYZE THE PROMPT**: Read "${prompt}" carefully and create something SPECIFIC to it
2. **NO GENERIC DESIGNS**: Don't create a generic website - make it UNIQUE to the purpose
3. **UNIQUE COLORS**: Choose colors that match the industry/purpose (NOT purple/blue gradients)
4. **SPECIFIC CONTENT**: Use real, meaningful content related to "${prompt}" (NO "Modern Design", "User-Friendly", generic text)
5. **PURPOSE-SPECIFIC FEATURES**: Add features that make sense for "${prompt}"
6. **CREATIVE DESIGN**: Think outside the box - make it memorable and different

⚠️ EXAMPLES OF WHAT TO DO:
- Portfolio website → Use creative layouts, project showcases, unique typography
- E-commerce → Product grids, shopping cart, filters, realistic product names
- SaaS landing → Feature comparison, pricing tiers, demo videos
- Restaurant → Menu cards, reservation system, food images placeholders
- Blog → Article cards, categories, author bios
- Agency → Team showcase, case studies, client logos

🎨 DESIGN RULES:
- Choose colors that match the industry (e.g., green for eco, blue for tech, warm for food)
- Use industry-specific terminology in content
- Create sections that make sense for the purpose
- Add unique visual elements (patterns, shapes, illustrations)
- Make each website look COMPLETELY DIFFERENT

🏗️ FILE STRUCTURE (6-10 files):
Generate files based on what "${prompt}" needs - be smart!

📦 DEPENDENCIES (if React):
- React 18+
- Tailwind CSS
- Framer Motion (for animations)
- Lucide React (for icons)

🎨 DESIGN SYSTEM:
- Choose a cohesive color palette (2-3 main colors)
- Consistent spacing (8px grid system)
- Typography scale (h1: 3rem, h2: 2rem, h3: 1.5rem, body: 1rem)
- Border radius: sm (0.25rem), md (0.5rem), lg (1rem)
- Shadows: subtle to dramatic based on hierarchy

💡 DESIGN TIPS:
- Use appropriate colors for the industry
- Add smooth hover effects and transitions
- Real, meaningful content (no "Lorem ipsum" or "Product 1")
- Make it look professional and polished

FORMAT YOUR RESPONSE AS JSON:
{
  "title": "Project Name",
  "description": "Brief project description",
  "framework": "${framework}",
  "primaryColor": "#hex",
  "secondaryColor": "#hex",
  "features": ["Feature 1", "Feature 2", ...],
  "dependencies": {
    "react": "^18.2.0",
    ...
  },
  "files": {
    "src/App.tsx": {
      "content": "// Complete file content",
      "language": "typescript"
    },
    "src/components/Hero.tsx": {
      "content": "// Complete Hero component",
      "language": "typescript"
    },
    ...
  }
}

Generate a COMPLETE, UNIQUE project NOW!`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 1.0, // MAXIMUM creativity for unique, diverse designs
        max_tokens: 32000, // MAXIMUM tokens for complex projects
        top_p: 1.0, // Maximum diversity in output
        stream: false // We'll add streaming separately
      });

      const response = chatCompletion.choices[0]?.message?.content || "";
      console.log("✅ GROQ project generated!");

      // Parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Failed to parse project JSON");
      }

      const project = JSON.parse(jsonMatch[0]) as MultiFileProject;
      
      // Validate and ensure all required fields exist
      if (!project.files || Object.keys(project.files).length === 0) {
        throw new Error("No files generated");
      }

      console.log(`✅ Generated ${Object.keys(project.files).length} files`);
      return project;

    } catch (error) {
      console.error("❌ Advanced GROQ generation failed:", error);
      throw error;
    }
  },

  /**
   * Modify a specific file in the project
   */
  async modifyFile(filePath: string, currentContent: string, instruction: string): Promise<string> {
    try {
      console.log(`⚡ Modifying ${filePath}...`);

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert developer. Modify code based on instructions while maintaining quality and structure."
          },
          {
            role: "user",
            content: `File: ${filePath}

CURRENT CONTENT:
\`\`\`
${currentContent}
\`\`\`

INSTRUCTION: ${instruction}

Return ONLY the complete modified file content, no explanations.`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 8000
      });

      const response = chatCompletion.choices[0]?.message?.content || currentContent;
      console.log(`✅ ${filePath} modified!`);
      return response;

    } catch (error) {
      console.error(`❌ Failed to modify ${filePath}:`, error);
      throw error;
    }
  },

  /**
   * Add a new file to the project
   */
  async generateNewFile(filePath: string, description: string, projectContext: string): Promise<string> {
    try {
      console.log(`⚡ Generating new file: ${filePath}...`);

      const language = this.getLanguageFromPath(filePath);

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert developer creating new files for existing projects."
          },
          {
            role: "user",
            content: `Create a new file: ${filePath}

DESCRIPTION: ${description}

PROJECT CONTEXT:
${projectContext}

REQUIREMENTS:
- Language: ${language}
- Production-ready code
- Proper imports/exports
- Follow project conventions
- Include comments for clarity

Return ONLY the file content, no explanations.`
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.6,
        max_tokens: 4000
      });

      const response = chatCompletion.choices[0]?.message?.content || "";
      console.log(`✅ ${filePath} created!`);
      return response;

    } catch (error) {
      console.error(`❌ Failed to create ${filePath}:`, error);
      throw error;
    }
  },

  getLanguageFromPath(path: string): string {
    const ext = path.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'ts': 'typescript',
      'tsx': 'typescript',
      'js': 'javascript',
      'jsx': 'javascript',
      'css': 'css',
      'html': 'html',
      'json': 'json',
      'md': 'markdown'
    };
    return languageMap[ext || ''] || 'plaintext';
  },

  getReactSystemPrompt(): string {
    return `You are an ELITE React developer who creates STUNNING, production-ready applications.

YOUR EXPERTISE:
- React 18+ with hooks (useState, useEffect, useMemo, useCallback)
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for smooth animations
- Component composition and reusability
- Clean code architecture
- Accessibility (WCAG 2.1 AA)
- Performance optimization

CODING STANDARDS:
- Use functional components with TypeScript
- Proper prop types and interfaces
- Meaningful variable names (no x, y, temp)
- Component files: PascalCase (Hero.tsx, ContactForm.tsx)
- Utility files: camelCase (helpers.ts, formatDate.ts)
- CSS: BEM or Tailwind classes
- Comments for complex logic only
- Export components as named exports

DESIGN PRINCIPLES:
- Mobile-first responsive design
- Consistent spacing (8px grid)
- Smooth animations (framer-motion)
- Professional color schemes
- Modern UI patterns (cards, gradients, glassmorphism)
- Micro-interactions on hover/click
- Loading states and error handling

NEVER:
- Use placeholder content ("Lorem ipsum", "Add content here")
- Leave TODO comments
- Create incomplete functions
- Use inline styles (use Tailwind classes)
- Ignore accessibility
- Write sloppy code`;
  },

  getVanillaSystemPrompt(): string {
    return `You are an ELITE vanilla JavaScript developer who creates STUNNING, production-ready websites.

YOUR EXPERTISE:
- Modern ES6+ JavaScript
- Clean, semantic HTML5
- Advanced CSS3 (Grid, Flexbox, Animations)
- Progressive enhancement
- Performance optimization
- Cross-browser compatibility
- Accessibility (WCAG 2.1 AA)

CODING STANDARDS:
- Use const/let (never var)
- Arrow functions for callbacks
- Template literals for strings
- Async/await for promises
- Proper error handling
- Semantic HTML tags
- BEM CSS methodology
- Mobile-first CSS

DESIGN PRINCIPLES:
- Responsive design (mobile → desktop)
- Smooth CSS transitions
- Professional color schemes
- Consistent spacing (8px grid)
- Modern UI patterns
- Fast load times (<3s)

NEVER:
- Use jQuery or outdated libraries
- Use placeholder content
- Leave incomplete sections
- Use inline styles
- Ignore accessibility`;
  }
};

