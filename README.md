# MyTupe - YouTube Video Search App

A React-based YouTube video search application built with Vite and Tailwind CSS.

## Features

- Search YouTube videos using SerpAPI
- Responsive design with mobile support
- Channel browsing and video details
- Arabic language support
- Modern UI with hover effects

## Recent Updates

### Vercel Deployment Fix

- Fixed API calls to work in both development and production
- Replaced axios with native fetch for better CORS handling
- Added environment-based API configuration
- Updated Vite config to only use proxy in development

## Development

```bash
npm install
npm run dev
```

## Production

The app is configured to work on Vercel with:

- Environment-based API routing
- Proper CORS handling
- Client-side routing support

## API Configuration

The app uses SerpAPI for YouTube search functionality. API calls are automatically configured for:

- Development: Uses Vite proxy
- Production: Direct API calls to SerpAPI

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- SerpAPI
- React Router
