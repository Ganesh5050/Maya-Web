import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock deployment data
const mockDeployments = [
  {
    id: '1',
    projectId: 'proj-1',
    platform: 'vercel',
    url: 'https://maya-web-demo.vercel.app',
    status: 'deployed',
    createdAt: new Date().toISOString(),
    deployedAt: new Date().toISOString()
  },
  {
    id: '2',
    projectId: 'proj-2',
    platform: 'netlify',
    url: 'https://maya-web-demo.netlify.app',
    status: 'building',
    createdAt: new Date().toISOString(),
    deployedAt: null
  }
];

const mockPlatforms = [
  { id: 'vercel', name: 'Vercel', icon: '▲', color: '#000' },
  { id: 'netlify', name: 'Netlify', icon: 'N', color: '#00C7B7' },
  { id: 'cloudflare', name: 'Cloudflare Pages', icon: '☁️', color: '#F38020' },
  { id: 'github', name: 'GitHub Pages', icon: '🐙', color: '#333' },
  { id: 'firebase', name: 'Firebase Hosting', icon: '🔥', color: '#FFCA28' },
  { id: 'aws', name: 'AWS Amplify', icon: '☁️', color: '#FF9900' }
];

// API Routes
app.get('/api/deployment/platforms', (req, res) => {
  res.json({ success: true, platforms: mockPlatforms });
});

app.get('/api/deployment/active', (req, res) => {
  res.json({ success: true, deployments: mockDeployments });
});

app.post('/api/deployment/deploy', (req, res) => {
  const { projectId, platform } = req.body;
  
  // Mock deployment process
  const newDeployment = {
    id: Date.now().toString(),
    projectId,
    platform,
    url: `https://maya-web-${projectId}.${platform}.app`,
    status: 'building',
    createdAt: new Date().toISOString(),
    deployedAt: null
  };
  
  mockDeployments.push(newDeployment);
  
  res.json({ 
    success: true, 
    deployment: newDeployment,
    message: `Deployment started on ${platform}`
  });
});

app.get('/api/deployment/:id/status', (req, res) => {
  const { id } = req.params;
  const deployment = mockDeployments.find(d => d.id === id);
  
  if (!deployment) {
    return res.status(404).json({ success: false, message: 'Deployment not found' });
  }
  
  res.json({ success: true, deployment });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Maya-Web Backend Server Running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Maya-Web Backend Server running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

export default app;