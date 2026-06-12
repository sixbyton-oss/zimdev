# Byton Movies - Vercel Deployment Guide

## Quick Deploy

1. Go to [vercel.com](https://vercel.com) and import this project
2. Set the following Environment Variable in Vercel Dashboard:
   - `VITE_TMDB_API_KEY` = `9b362f10e0304f62282c9610e7c5ab52`
3. Deploy!

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_TMDB_API_KEY` | Yes | Your TMDB API key |
| `VITE_SUPABASE_URL` | No | Supabase URL (for Edge Function fallback) |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase anon key |

## Features

- Browse trending, popular, and top-rated movies & TV shows
- Search for movies and TV shows
- View details with trailers, cast, and ratings
- Genre filtering
- Responsive design for mobile and desktop
- Custom loading animation with Byton Movies branding
