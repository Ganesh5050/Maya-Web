/**
 * Agent-Based Website Generation Workflow
 * Multi-step process: Plan → Generate → Validate → Fix (like bolt.diy)
 */

import { advancedGroqService } from './advancedGroqService';
import { advancedGeminiService, type MultiFileProject } from './advancedGeminiService';
import { getModelConfig, getFileStructureForModel } from './modelPrompts';

export interface ProjectPlan {
  projectType: string;
  features: string[];
  pages: string[];
  components: Array<{
    name: string;
    purpose: string;
    dependencies: string[];
  }>;
  techStack: {
    framework: string;
    styling: string;
    animations: string;
    router?: string;
    stateManagement?: string;
  };
  fileStructure: Record<string, string[]>;
}

export interface ValidationError {
  file: string;
  type: 'placeholder' | 'missing_import' | 'no_export' | 'syntax_error' | 'invalid_component';
  message: string;
  line?: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}

export interface GenerationProgress {
  step: 'planning' | 'generating' | 'validating' | 'fixing' | 'complete';
  currentFile?: string;
  totalFiles?: number;
  completedFiles?: number;
  status: 'pending' | 'active' | 'complete' | 'error';
  message?: string;
}

type ProgressCallback = (progress: GenerationProgress) => void;

export class WebsiteGenerationAgent {
  private onProgress?: ProgressCallback;

  constructor(onProgress?: ProgressCallback) {
    this.onProgress = onProgress;
  }

  private emitProgress(progress: GenerationProgress) {
    if (this.onProgress) {
      this.onProgress(progress);
    }
  }

  /**
   * Step 1: Create detailed project plan
   */
  async createPlan(userPrompt: string, model: string): Promise<ProjectPlan> {
    this.emitProgress({
      step: 'planning',
      status: 'active',
      message: 'Analyzing your request and creating project plan...'
    });

    console.log('📋 Creating project plan with', model);

    const modelConfig = getModelConfig(model);
    const fileStructureGuide = getFileStructureForModel(model);

    const planPrompt = `${modelConfig.systemPrompt}

Analyze this request and create a DETAILED project plan:

"${userPrompt}"

${fileStructureGuide}

Return a JSON object with this EXACT structure:
{
  "projectType": "ecommerce|saas|portfolio|blog|landing|corporate",
  "features": ["feature1", "feature2", "feature3", ...],
  "pages": ["home", "about", "contact", ...],
  "components": [
    {
      "name": "Hero",
      "purpose": "Main landing section with CTA",
      "dependencies": []
    },
    {
      "name": "Features",
      "purpose": "Feature showcase grid",
      "dependencies": ["Card", "Icon"]
    }
  ],
  "techStack": {
    "framework": "React",
    "styling": "Tailwind CSS",
    "animations": "Framer Motion",
    "router": "React Router",
    "stateManagement": "useState/useReducer"
  },
  "fileStructure": {
    "src/features/hero": ["Hero.tsx", "useHeroAnimation.ts"],
    "src/features/pricing": ["Pricing.tsx", "PricingCard.tsx"],
    "src/shared/ui": ["Button.tsx", "Card.tsx", "Modal.tsx"],
    "src/shared/hooks": ["useForm.ts", "useMediaQuery.ts"],
    "src/shared/utils": ["validation.ts", "formatters.ts"]
  }
}

IMPORTANT: Return ONLY the JSON, no markdown, no explanations.`;

    try {
      let planResponse: string;
      
      if (model === 'groq') {
        const result = await advancedGroqService.generateProject(planPrompt, 'React');
        planResponse = JSON.stringify(result);
      } else {
        const result = await advancedGeminiService.generateProject(planPrompt, 'React');
        planResponse = JSON.stringify(result);
      }

      // Extract JSON from response
      const jsonMatch = planResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to extract JSON from plan');
      }

      const plan: ProjectPlan = JSON.parse(jsonMatch[0]);

      this.emitProgress({
        step: 'planning',
        status: 'complete',
        message: `Plan created: ${plan.components.length} components, ${Object.keys(plan.fileStructure).length} folders`
      });

      console.log('✅ Plan created:', plan);
      return plan;
      
    } catch (error) {
      console.error('❌ Planning failed:', error);
      this.emitProgress({
        step: 'planning',
        status: 'error',
        message: 'Planning failed, using fallback plan'
      });

      // Fallback plan
      return {
        projectType: 'landing',
        features: ['Hero', 'Features', 'Contact'],
        pages: ['home'],
        components: [
          { name: 'Hero', purpose: 'Hero section', dependencies: [] },
          { name: 'Features', purpose: 'Features grid', dependencies: [] },
          { name: 'Contact', purpose: 'Contact form', dependencies: [] }
        ],
        techStack: {
          framework: 'React',
          styling: 'Tailwind CSS',
          animations: 'Framer Motion'
        },
        fileStructure: {
          'src': ['App.tsx', 'main.tsx'],
          'src/components': ['Hero.tsx', 'Features.tsx', 'Contact.tsx']
        }
      };
    }
  }

  /**
   * Step 2: Generate all files based on plan
   */
  async generateFiles(plan: ProjectPlan, userPrompt: string, model: string): Promise<MultiFileProject> {
    console.log('🔨 Generating files with', model);

    this.emitProgress({
      step: 'generating',
      status: 'active',
      totalFiles: Object.values(plan.fileStructure).flat().length,
      completedFiles: 0,
      message: 'Generating project files...'
    });

    try {
      let project: MultiFileProject;
      
      // 🔥 USE THE ORIGINAL PROMPT DIRECTLY - No double planning!
      console.log('📝 Using original user prompt for generation');
      
      if (model === 'groq') {
        project = await advancedGroqService.generateProject(userPrompt, 'React');
      } else {
        project = await advancedGeminiService.generateProject(userPrompt, 'React');
      }

      // ✅ Success - update progress
      this.emitProgress({
        step: 'generating',
        status: 'complete',
        totalFiles: Object.keys(project.files).length,
        completedFiles: Object.keys(project.files).length,
        message: `Generated ${Object.keys(project.files).length} files`
      });

      console.log(`✅ Generated ${Object.keys(project.files).length} files`);
      console.log('📦 Files:', Object.keys(project.files));
      
      return project;
      
    } catch (error) {
      console.error('❌ Generation failed:', error);
      throw error;
    }
  }

  /**
   * Step 3: Validate generated code
   */
  async validate(files: MultiFileProject['files']): Promise<ValidationResult> {
    this.emitProgress({
      step: 'validating',
      status: 'active',
      message: 'Validating generated code...'
    });

    console.log('✅ Validating code...');

    const errors: ValidationError[] = [];
    const warnings: string[] = [];

    for (const [path, file] of Object.entries(files)) {
      // Check for placeholders
      const content = file.content;
      
      if (content.includes('TODO') || 
          content.includes('placeholder') ||
          content.includes('...') ||
          content.includes('add more') ||
          content.includes('implement this')) {
        errors.push({
          file: path,
          type: 'placeholder',
          message: 'File contains placeholders or TODOs'
        });
      }

      // Check for missing imports in TypeScript files
      if (path.endsWith('.tsx') || path.endsWith('.ts')) {
        const imports = content.match(/import .* from ['"](.*)['"];/g) || [];
        
        for (const imp of imports) {
          const match = imp.match(/from ['"](.*)['"];/);
          if (match) {
            const importPath = match[1];
            
            // Check for relative imports
            if (importPath.startsWith('./') || importPath.startsWith('../')) {
              const cleanPath = importPath.replace(/^\.\//, '').replace(/^\.\.\//, '');
              const possiblePaths = [
                cleanPath,
                cleanPath + '.tsx',
                cleanPath + '.ts',
                cleanPath + '/index.tsx',
                cleanPath + '/index.ts'
              ];
              
              const exists = possiblePaths.some(p => files[p] || files[`src/${p}`]);
              
              if (!exists) {
                warnings.push(`${path}: Import may not exist: ${importPath}`);
              }
            }
          }
        }

        // Check for exports
        if (!content.includes('export')) {
          warnings.push(`${path}: File has no exports`);
        }
      }

      // Check React components have proper structure
      if (path.includes('/components/') && path.endsWith('.tsx')) {
        if (!content.includes('export default') && !content.includes('export function') && !content.includes('export const')) {
          errors.push({
            file: path,
            type: 'invalid_component',
            message: 'Component file missing export'
          });
        }
      }
    }

    const valid = errors.length === 0;

    this.emitProgress({
      step: 'validating',
      status: valid ? 'complete' : 'error',
      message: valid ? '✅ Validation passed!' : `Found ${errors.length} errors`
    });

    console.log(valid ? '✅ Validation passed!' : `⚠️ Found ${errors.length} errors, ${warnings.length} warnings`);

    return { valid, errors, warnings };
  }

  /**
   * Step 4: Fix errors using AI
   */
  async fixErrors(
    files: MultiFileProject['files'],
    errors: ValidationError[],
    model: string
  ): Promise<MultiFileProject['files']> {
    if (errors.length === 0) return files;

    this.emitProgress({
      step: 'fixing',
      status: 'active',
      totalFiles: errors.length,
      completedFiles: 0,
      message: `Fixing ${errors.length} errors...`
    });

    console.log(`🔧 Fixing ${errors.length} errors...`);

    const fixedFiles = { ...files };
    let fixed = 0;

    for (const error of errors.slice(0, 5)) { // Limit to 5 fixes to avoid long loops
      try {
        const file = fixedFiles[error.file];
        if (!file) continue;

        const fixPrompt = `Fix this error in the code:

FILE: ${error.file}
ERROR TYPE: ${error.type}
ERROR: ${error.message}

CURRENT CODE:
\`\`\`${file.language}
${file.content}
\`\`\`

Return ONLY the FIXED code, no explanations, no markdown code blocks.`;

        console.log(`Fixing ${error.file}...`);

        let fixedContent: string;
        if (model === 'groq') {
          fixedContent = await advancedGroqService.modifyFile(error.file, file.content, fixPrompt);
        } else {
          fixedContent = await advancedGeminiService.modifyFile(error.file, file.content, fixPrompt);
        }

        fixedFiles[error.file] = {
          ...file,
          content: fixedContent
        };

        fixed++;
        
        this.emitProgress({
          step: 'fixing',
          status: 'active',
          totalFiles: errors.length,
          completedFiles: fixed,
          currentFile: error.file,
          message: `Fixed ${fixed}/${errors.length} errors`
        });

      } catch (err) {
        console.error(`Failed to fix ${error.file}:`, err);
      }
    }

    this.emitProgress({
      step: 'fixing',
      status: 'complete',
      message: `Fixed ${fixed} errors`
    });

    console.log(`✅ Fixed ${fixed} errors`);
    return fixedFiles;
  }

  /**
   * Main workflow: Generate complete project with validation and fixes
   */
  async generate(userPrompt: string, model: string): Promise<{
    project: MultiFileProject;
    plan: ProjectPlan;
    validation: ValidationResult;
    iterations: number;
  }> {
    console.log('🤖 Starting agent workflow...');

    try {
      // Step 1: Plan
      const plan = await this.createPlan(userPrompt, model);

      // Step 2: Generate
      let project = await this.generateFiles(plan, userPrompt, model);

      // Step 3: Validate
      let validation = await this.validate(project.files);

      // Step 4: Fix (up to 2 iterations)
      let iterations = 0;
      const maxIterations = 2;

      while (!validation.valid && iterations < maxIterations) {
        console.log(`🔧 Iteration ${iterations + 1}/${maxIterations}: Fixing errors...`);
        
        project.files = await this.fixErrors(project.files, validation.errors, model);
        validation = await this.validate(project.files);
        iterations++;
      }

      this.emitProgress({
        step: 'complete',
        status: 'complete',
        message: '✅ Project generated successfully!'
      });

      console.log('✅ Agent workflow complete!');

      return {
        project,
        plan,
        validation,
        iterations
      };

    } catch (error) {
      console.error('❌ Agent workflow failed:', error);
      
      this.emitProgress({
        step: 'complete',
        status: 'error',
        message: 'Generation failed. Please try again.'
      });

      throw error;
    }
  }
}

