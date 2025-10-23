import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDU7SiHth-x9tYrWt57gGH0yxP6yfeGOBo";
const genAI = new GoogleGenerativeAI(API_KEY);

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
      console.log(`💎 Generating ${framework} project with Gemini...`);
      console.log(`📝 User prompt: "${prompt}"`);

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest",
        generationConfig: {
          temperature: 2.0, // MAXIMUM creativity (Gemini supports up to 2.0)
          topP: 1.0,
          topK: 64,
        }
      });

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
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "dependencies": {
    "react": "^18.2.0"
  },
  "files": {
    "src/App.tsx": {
      "content": "complete file content here",
      "language": "typescript"
    }
  }
}

IMPORTANT: Return ONLY the JSON object, no explanations before or after!`;

      const result = await model.generateContent(fullPrompt);
      const response = result.response.text();
      
      console.log("✅ Gemini responded!");

      // Extract JSON from response (handle markdown code blocks if present)
      let jsonText = response.trim();
      
      // Remove markdown code blocks if present
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      // Find JSON object
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Failed to extract JSON from response");
      }

      const project = JSON.parse(jsonMatch[0]) as MultiFileProject;

      if (!project.files || Object.keys(project.files).length === 0) {
        throw new Error("No files generated");
      }

      console.log(`✅ Generated ${Object.keys(project.files).length} files with Gemini`);
      return project;

    } catch (error) {
      console.error("❌ Gemini project generation failed:", error);
      throw error;
    }
  },

  async modifyFile(filePath: string, currentContent: string, instruction: string): Promise<string> {
    try {
      console.log(`💎 Modifying ${filePath} with Gemini...`);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      const prompt = `You are an expert developer. Modify this file based on the instruction.

File: ${filePath}

CURRENT CONTENT:
\`\`\`
${currentContent}
\`\`\`

INSTRUCTION: ${instruction}

Return ONLY the complete modified file content. No explanations, no markdown code blocks, just the raw file content.`;

      const result = await model.generateContent(prompt);
      const response = result.response.text().trim();
      
      // Remove code blocks if present
      let content = response;
      if (content.startsWith('```')) {
        content = content.replace(/```[a-z]*\n?/g, '');
      }

      console.log(`✅ ${filePath} modified with Gemini!`);
      return content;

    } catch (error) {
      console.error(`❌ Gemini file modification failed:`, error);
      throw error;
    }
  },

  async generateNewFile(filePath: string, description: string, projectContext: string): Promise<string> {
    try {
      console.log(`💎 Creating ${filePath} with Gemini...`);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const language = this.getLanguageFromPath(filePath);

      const prompt = `Create a new file for an existing project.

File Path: ${filePath}
Language: ${language}

DESCRIPTION: ${description}

PROJECT CONTEXT:
${projectContext}

REQUIREMENTS:
- Production-ready code
- Proper imports and exports
- Follow best practices
- Include helpful comments
- Match project style

Return ONLY the file content. No explanations, no markdown, just the raw code.`;

      const result = await model.generateContent(prompt);
      const response = result.response.text().trim();
      
      let content = response;
      if (content.startsWith('```')) {
        content = content.replace(/```[a-z]*\n?/g, '');
      }

      console.log(`✅ ${filePath} created with Gemini!`);
      return content;

    } catch (error) {
      console.error(`❌ Gemini file creation failed:`, error);
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
    return `You are an ELITE React/TypeScript developer creating production-ready applications.

EXPERTISE:
- React 18+ with modern hooks
- TypeScript for type safety  
- Tailwind CSS for styling
- Framer Motion for animations
- Clean architecture
- Accessibility
- Performance

STANDARDS:
- Functional components + TypeScript
- Proper interfaces and types
- Meaningful names
- Named exports
- Tailwind classes (no inline styles)
- Comments for complex logic only

DESIGN:
- Mobile-first responsive
- 8px grid spacing
- Smooth animations
- Modern UI (cards, gradients, glass)
- Micro-interactions
- Professional colors

NEVER use placeholders, TODOs, or incomplete code!`;
  },

  getVanillaSystemPrompt(): string {
    return `You are an ELITE vanilla JavaScript developer creating production-ready websites.

EXPERTISE:
- Modern ES6+ JavaScript
- Semantic HTML5
- Advanced CSS3
- Performance optimization
- Accessibility
- Cross-browser compatibility

STANDARDS:
- const/let (never var)
- Arrow functions
- Template literals
- Async/await
- Semantic HTML
- BEM CSS
- Mobile-first

DESIGN:
- Responsive design
- Smooth CSS transitions
- Professional colors
- 8px grid spacing
- Modern UI patterns
- Fast load times

NEVER use jQuery, placeholders, or incomplete code!`;
  }
};

