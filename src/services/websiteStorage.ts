// Website Storage Service - Stores generated websites locally
// In production, this would be a database (MongoDB, Supabase, etc.)

export interface GeneratedWebsite {
  id: string;
  slug: string;
  prompt: string;
  title: string;
  description: string;
  type: string;
  primaryColor: string;
  secondaryColor: string;
  sections: string[];
  features: string[];
  components: string[];
  techStack: {
    framework: string;
    styling: string;
    backend: string;
  };
  files: any;
  createdAt: string;
  html?: string;
  aiGeneratedHTML?: string;
}

class WebsiteStorageService {
  private STORAGE_KEY = 'maya_generated_websites';

  // Generate unique slug from title
  generateSlug(title: string): string {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const timestamp = Date.now().toString(36).slice(-6);
    return `${baseSlug}-${timestamp}`;
  }

  // Save a generated website
  saveWebsite(website: GeneratedWebsite): string {
    const websites = this.getAllWebsites();
    const slug = this.generateSlug(website.title);
    
    const siteToSave = {
      ...website,
      id: slug,
      slug,
      createdAt: new Date().toISOString()
    };
    
    websites[slug] = siteToSave;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(websites));
    
    return slug;
  }

  // Get a specific website by slug
  getWebsite(slug: string): GeneratedWebsite | null {
    const websites = this.getAllWebsites();
    return websites[slug] || null;
  }

  // Get all websites
  getAllWebsites(): Record<string, GeneratedWebsite> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading websites from storage:', error);
      return {};
    }
  }

  // Get all websites as array (for listing)
  getWebsitesList(): GeneratedWebsite[] {
    const websites = this.getAllWebsites();
    return Object.values(websites).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Delete a website
  deleteWebsite(slug: string): boolean {
    const websites = this.getAllWebsites();
    if (websites[slug]) {
      delete websites[slug];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(websites));
      return true;
    }
    return false;
  }

  // Clear all websites
  clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Get count of websites
  getCount(): number {
    return Object.keys(this.getAllWebsites()).length;
  }
}

export const websiteStorage = new WebsiteStorageService();

