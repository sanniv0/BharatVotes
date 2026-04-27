import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", environment: process.env.NODE_ENV || 'development' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
        hmr: false // Consistent with AI Studio environment
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Serve static files, but explicitly don't serve index.html automatically so we can intercept it
    app.use(express.static(distPath, { index: false }));
    
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf-8');
        
        // Collect all VITE_ prefixed environment variables from the server runtime
        const envVars = Object.keys(process.env)
          .filter(key => key.startsWith('VITE_'))
          .reduce((obj, key) => {
            obj[key] = process.env[key];
            return obj;
          }, {} as Record<string, string | undefined>);
          
        const envScript = `<script>window.ENV = ${JSON.stringify(envVars)};</script>`;
        html = html.replace('</head>', `  ${envScript}\n</head>`);
        
        res.send(html);
      } else {
        res.status(404).send("index.html not found. Please run 'npm run build' first.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
