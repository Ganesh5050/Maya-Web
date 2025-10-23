// SECURE VERSION - Calls backend API route instead of exposing API key in browser

export interface MultiFileProject {
  title: string;
  description: string;
  framework: string;
  files: {
    [path: string]: {
      content: string;
      language: string;
    }
  };
  dependencies: { [key: string]: string };
  features: string[];
  primaryColor: string;
  secondaryColor: string;
}

export const advancedGeminiService = {
  async generateProject(prompt: string, framework: string = "React"): Promise<MultiFileProject> {
    try {
      console.log(`💎 Generating ${framework} project with Gemini (via secure backend)...`);
      console.log(`📝 User prompt: "${prompt}"`);

      const systemContext = framework === "React" 
        ? this.getReactSystemPrompt()
        : this.getVanillaSystemPrompt();

      // Add randomization seed to ensure uniqueness
      const uniqueSeed = Date.now().toString(36).slice(-4);

      const fullPrompt = `${systemContext}

Create a COMPLETELY UNIQUE ${framework} website for: "${prompt}" [Seed: ${uniqueSeed}]

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
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.16.0",
  "lucide-react": "^0.294.0"
}

🎨 DESIGN EXCELLENCE:
- Choose a beautiful, cohesive color palette
- Use gradients and glassmorphism effects
- Add smooth animations and transitions
- Implement micro-interactions
- Perfect typography hierarchy
- Professional spacing (8px grid)
- Mobile-first responsive design

💡 CREATIVITY:
- Analyze the prompt deeply
- Add unique, creative elements
- Choose design style that fits the purpose
- Make it memorable and engaging
- Add personality and character

FORMAT YOUR RESPONSE AS PURE JSON (no markdown, no code blocks):
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
    ...
  }
}

Generate NOW - be CREATIVE and UNIQUE!`;

      // Call our secure backend API route
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          temperature: 2.0,
          model: "gemini-2.0-flash-exp"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Backend API request failed');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "";
      console.log("✅ Gemini project generated!");

      // Parse JSON (handle both pure JSON and markdown-wrapped JSON)
      let jsonText = aiResponse.trim();
      
      // Remove markdown code blocks if present
      const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1].trim();
      }

      // Find the JSON object
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
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
      console.error("❌ Advanced Gemini generation failed:", error);
      throw error;
    }
  },

  async modifyFile(filePath: string, currentContent: string, instruction: string): Promise<string> {
    try {
      console.log(`💎 Modifying ${filePath}...`);

      const prompt = `You are an expert developer. Modify code based on instructions while maintaining quality and structure.

File: ${filePath}

CURRENT CONTENT:
\`\`\`
${currentContent}
\`\`\`

INSTRUCTION: ${instruction}

Return ONLY the complete modified file content, no explanations.`;

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
      const modifiedContent = data.candidates[0]?.content?.parts[0]?.text || currentContent;
      console.log(`✅ ${filePath} modified!`);
      return modifiedContent;

    } catch (error) {
      console.error(`❌ Failed to modify ${filePath}:`, error);
      throw error;
    }
  },

  async generateNewFile(filePath: string, description: string, projectContext: string): Promise<string> {
    try {
      console.log(`💎 Generating new file: ${filePath}...`);

      const language = this.getLanguageFromPath(filePath);

      const prompt = `You are an expert developer creating new files for existing projects.

Create a new file: ${filePath}

DESCRIPTION: ${description}

PROJECT CONTEXT:
${projectContext}

REQUIREMENTS:
- Language: ${language}
- Production-ready code
- Proper imports/exports
- Follow project conventions
- Include comments for clarity

Return ONLY the file content, no explanations.`;

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.6,
          model: "gemini-2.0-flash-exp"
        })
      });

      if (!response.ok) {
        throw new Error('Backend API request failed');
      }

      const data = await response.json();
      const fileContent = data.candidates[0]?.content?.parts[0]?.text || "";
      console.log(`✅ ${filePath} created!`);
      return fileContent;

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
