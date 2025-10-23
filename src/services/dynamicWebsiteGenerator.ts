// Dynamic Website Generator - Creates unique websites based on prompts
// This simulates AI generation with smart variations

interface WebsiteConfig {
  type: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  sections: string[];
  features: string[];
}

export class DynamicWebsiteGenerator {
  // Generate unique color scheme based on type and prompt
  generateColorScheme(type: string, prompt: string): { primary: string; secondary: string } {
    const lowerPrompt = prompt.toLowerCase();
    
    // Check for color keywords in prompt
    if (lowerPrompt.includes('blue')) {
      return { primary: '#3b82f6', secondary: '#1e40af' };
    } else if (lowerPrompt.includes('green')) {
      return { primary: '#10b981', secondary: '#059669' };
    } else if (lowerPrompt.includes('purple')) {
      return { primary: '#8b5cf6', secondary: '#7c3aed' };
    } else if (lowerPrompt.includes('red')) {
      return { primary: '#ef4444', secondary: '#dc2626' };
    } else if (lowerPrompt.includes('orange')) {
      return { primary: '#f97316', secondary: '#ea580c' };
    } else if (lowerPrompt.includes('pink')) {
      return { primary: '#ec4899', secondary: '#db2777' };
    }
    
    // Default colors by type with variations
    const colorSchemes = {
      ecommerce: [
        { primary: '#10b981', secondary: '#059669' },
        { primary: '#f59e0b', secondary: '#d97706' },
        { primary: '#3b82f6', secondary: '#2563eb' }
      ],
      portfolio: [
        { primary: '#8b5cf6', secondary: '#7c3aed' },
        { primary: '#06b6d4', secondary: '#0891b2' },
        { primary: '#ec4899', secondary: '#db2777' }
      ],
      blog: [
        { primary: '#f97316', secondary: '#ea580c' },
        { primary: '#ef4444', secondary: '#dc2626' },
        { primary: '#84cc16', secondary: '#65a30d' }
      ],
      business: [
        { primary: '#1e40af', secondary: '#1e3a8a' },
        { primary: '#475569', secondary: '#334155' },
        { primary: '#059669', secondary: '#047857' }
      ],
      landing: [
        { primary: '#6366f1', secondary: '#4f46e5' },
        { primary: '#8b5cf6', secondary: '#7c3aed' },
        { primary: '#3b82f6', secondary: '#2563eb' }
      ]
    };
    
    const schemes = colorSchemes[type] || colorSchemes.landing;
    const hash = this.hashString(prompt);
    const index = hash % schemes.length;
    
    return schemes[index];
  }

  // Generate unique title variations
  generateTitleVariations(baseTitle: string, type: string): string {
    const variations = {
      ecommerce: ['Shop', 'Store', 'Market', 'Outlet', 'Emporium'],
      portfolio: ['Portfolio', 'Works', 'Showcase', 'Studio', 'Gallery'],
      blog: ['Blog', 'Journal', 'Stories', 'Insights', 'Chronicle'],
      business: ['Solutions', 'Services', 'Group', 'Company', 'Corp'],
      landing: ['Platform', 'Hub', 'App', 'Service', 'Pro']
    };
    
    const suffixes = variations[type] || ['Website', 'Online', 'Digital'];
    
    // If title is very short, add suffix
    if (baseTitle.split(' ').length === 1 && Math.random() > 0.5) {
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      return `${baseTitle} ${suffix}`;
    }
    
    return baseTitle;
  }

  // Generate unique features based on prompt keywords
  generateSmartFeatures(prompt: string, type: string): string[] {
    const lowerPrompt = prompt.toLowerCase();
    const features: string[] = [];
    
    // Base features by type
    const typeFeatures = {
      ecommerce: ['Secure Checkout', 'Product Catalog', 'Shopping Cart'],
      portfolio: ['Project Showcase', 'Skills Display', 'Contact Form'],
      blog: ['Article Publishing', 'Category System', 'Comment Section'],
      business: ['Service Overview', 'Team Profiles', 'Contact Integration'],
      landing: ['Lead Capture', 'Feature Highlights', 'Call-to-Action']
    };
    
    features.push(...(typeFeatures[type] || ['Modern Design', 'User-Friendly']));
    
    // Add features based on keywords
    if (lowerPrompt.includes('mobile') || lowerPrompt.includes('responsive')) {
      features.push('Mobile Responsive');
    }
    if (lowerPrompt.includes('dark mode') || lowerPrompt.includes('theme')) {
      features.push('Dark Mode Support');
    }
    if (lowerPrompt.includes('seo')) {
      features.push('SEO Optimized');
    }
    if (lowerPrompt.includes('fast') || lowerPrompt.includes('performance')) {
      features.push('Lightning Fast');
    }
    if (lowerPrompt.includes('secure') || lowerPrompt.includes('safety')) {
      features.push('Enterprise Security');
    }
    if (lowerPrompt.includes('analytics')) {
      features.push('Analytics Dashboard');
    }
    if (lowerPrompt.includes('payment') || lowerPrompt.includes('stripe')) {
      features.push('Payment Integration');
    }
    if (lowerPrompt.includes('search')) {
      features.push('Advanced Search');
    }
    
    // Add random professional features if we have less than 5
    const professionalFeatures = [
      'Cloud Hosting Ready',
      'API Integration',
      'Admin Dashboard',
      'User Authentication',
      'Real-time Updates',
      'Multi-language Support',
      'Advanced Filtering',
      'Email Notifications'
    ];
    
    while (features.length < 6) {
      const randomFeature = professionalFeatures[Math.floor(Math.random() * professionalFeatures.length)];
      if (!features.includes(randomFeature)) {
        features.push(randomFeature);
      }
    }
    
    return features.slice(0, 6);
  }

  // Generate unique sections based on prompt
  generateSmartSections(prompt: string, type: string): string[] {
    const lowerPrompt = prompt.toLowerCase();
    const sections: string[] = ['hero'];
    
    // Type-specific base sections
    const typeSections = {
      ecommerce: ['products', 'features', 'checkout'],
      portfolio: ['about', 'projects', 'contact'],
      blog: ['latest-posts', 'categories'],
      business: ['services', 'about', 'team'],
      landing: ['features', 'pricing', 'cta']
    };
    
    sections.push(...(typeSections[type] || ['features', 'about']));
    
    // Add conditional sections
    if (lowerPrompt.includes('testimonial') || lowerPrompt.includes('review')) {
      sections.push('testimonials');
    }
    if (lowerPrompt.includes('pricing')) {
      sections.push('pricing');
    }
    if (lowerPrompt.includes('faq') || lowerPrompt.includes('questions')) {
      sections.push('faq');
    }
    if (lowerPrompt.includes('gallery') || lowerPrompt.includes('portfolio')) {
      sections.push('gallery');
    }
    if (lowerPrompt.includes('team')) {
      sections.push('team');
    }
    if (lowerPrompt.includes('blog')) {
      sections.push('blog');
    }
    if (lowerPrompt.includes('contact')) {
      sections.push('contact');
    }
    
    // Always end with contact if not present
    if (!sections.includes('contact')) {
      sections.push('contact');
    }
    
    return [...new Set(sections)]; // Remove duplicates
  }

  // Generate unique description
  generateSmartDescription(title: string, type: string, prompt: string): string {
    const descriptions = {
      ecommerce: [
        `Discover amazing products at ${title}. Shop with confidence with fast shipping, secure payments, and unbeatable customer service.`,
        `${title} - Your trusted online shopping destination. Quality products, competitive prices, and exceptional service.`,
        `Shop the best selection at ${title}. Free shipping on orders over $50. Satisfaction guaranteed.`
      ],
      portfolio: [
        `${title} - Creative professional showcasing innovative work and expertise. Let's bring your ideas to life.`,
        `Explore the portfolio of ${title}. Experienced designer and developer with a passion for creating beautiful, functional experiences.`,
        `${title} - Transforming ideas into reality through design and code. View my work and let's collaborate.`
      ],
      blog: [
        `${title} - Insights, stories, and expert analysis. Join thousands of readers staying informed on the latest trends.`,
        `Discover thoughtful articles and in-depth coverage at ${title}. Your source for quality content and fresh perspectives.`,
        `${title} brings you authentic stories and expert commentary. Subscribe to stay updated with our latest posts.`
      ],
      business: [
        `${title} delivers professional solutions tailored to your business needs. Trusted by industry leaders worldwide.`,
        `Partner with ${title} for innovative services and proven results. Let's grow your business together.`,
        `${title} - Excellence in service, dedication to results. Empowering businesses to achieve their full potential.`
      ],
      landing: [
        `${title} - The modern solution you've been waiting for. Join thousands of satisfied customers today.`,
        `Transform your workflow with ${title}. Powerful features, intuitive design, and exceptional support.`,
        `${title} makes it easy to achieve your goals. Get started in minutes, see results immediately.`
      ]
    };
    
    const options = descriptions[type] || descriptions.landing;
    const hash = this.hashString(prompt + title);
    const index = hash % options.length;
    
    return options[index];
  }

  // Simple hash function for consistent randomization
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

export const dynamicGenerator = new DynamicWebsiteGenerator();

