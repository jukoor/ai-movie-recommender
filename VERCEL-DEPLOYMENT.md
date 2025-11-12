# Vercel Deployment Guide

## Environment Variables Setup

This application is configured to work both locally and on Vercel. The code automatically checks for environment variables with and without the `VITE_` prefix.

### For Local Development

Run both the Vite dev server and Express API server:

```bash
# Run the development server (runs both Vite and Express server)
npm run dev
```

Keep all variables WITH the `VITE_` prefix in your `.env` file (Vite requires this):

```bash
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_key_here
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OPENROUTER_API_KEY=your_key_here
```

**How it works locally:**

- `npm run dev` starts both Vite (frontend) and Express (API server) concurrently
- Vite dev server runs on `http://localhost:5173`
- Express API server runs on `http://localhost:4000`
- Vite proxies `/api/*` requests to the Express server automatically

### For Vercel Deployment

In your Vercel project dashboard, add environment variables **WITHOUT** the `VITE_` prefix:

1. Go to your Vercel project → Settings → Environment Variables
2. Add the following variables:

```
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_key_here
FIREBASE_API_KEY=your_key_here
FIREBASE_AUTH_DOMAIN=your_domain_here
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket_here
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
OPENROUTER_API_KEY=your_key_here
```

**Note:** The application code will automatically check for both prefixed and non-prefixed versions, so it works seamlessly in both environments.

## Deployment Steps

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables (without `VITE_` prefix)
4. Deploy!

The `vercel.json` configuration is already set up to handle API routes correctly.

## Troubleshooting

**Environment variables not working in production?**

- Ensure you added them in Vercel dashboard WITHOUT the `VITE_` prefix
- Redeploy after adding environment variables

**API routes returning 404?**

- Check that `vercel.json` exists and is configured correctly
- Ensure your serverless functions are in the `api/` directory

**Local development not working?**

```bash
# Make sure all dependencies are installed
npm install
cd server && npm install && cd ..

# Run the development server
npm run dev
```

**Port 4000 already in use?**

- Stop any other processes using port 4000
- Or change the PORT in `server/index.js` and update the proxy target in `vite.config.ts`

## Deployment Steps

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables (without `VITE_` prefix)
4. Deploy!

The `vercel.json` configuration is already set up to handle API routes correctly.
