# Local Development Setup

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your API keys (all with `VITE_` prefix)

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   This will start:
   - Vite dev server at `http://localhost:5173`
   - Express API server at `http://localhost:4000`

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## How It Works

### Local Development

- `npm run dev` runs both Vite and the Express server concurrently
- Vite proxies API requests (`/api/*`) to the Express server running on port 4000
- Environment variables use the `VITE_` prefix (required by Vite)

### Production (Vercel)

- Frontend is built with `vite build` and served as static files
- API requests (`/api/recommend`) are handled by Vercel serverless functions in `/api/recommend.js`
- Environment variables in Vercel are set WITHOUT the `VITE_` prefix

## Available Scripts

- `npm run dev` - Start both Vite and Express server for local development
- `npm run dev:vite` - Start only the Vite dev server
- `npm run dev:server` - Start only the Express API server
- `npm run build` - Build the production-ready frontend
- `npm run preview` - Preview the production build locally
- `npm test` - Run tests with Vitest

## Architecture

```
┌─────────────────────┐
│   Browser           │
│  localhost:5173     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Vite Dev Server   │  ◄── Proxies /api/* requests
│   (Frontend)        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Express Server     │
│  localhost:4000     │
│  (/api/recommend)   │
└─────────────────────┘

Production (Vercel):
┌─────────────────────┐
│   Browser           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Vercel CDN        │  ◄── Static files (Vite build)
│                     │
│   /api/recommend    │  ◄── Serverless function
└─────────────────────┘
```

## Troubleshooting

**Port 4000 already in use:**

- Check for other running processes: `lsof -i :4000`
- Kill the process or change the port in `server/index.js` and `vite.config.ts`

**API requests failing:**

- Ensure both servers are running (check terminal output)
- Verify `.env` file exists with correct variables
- Check Express server logs for errors

**Hot reload not working:**

- Vite hot reload works for frontend changes
- Express server needs manual restart for API changes
- Consider adding nodemon for Express if needed
