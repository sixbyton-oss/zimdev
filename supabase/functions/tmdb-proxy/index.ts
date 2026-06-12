import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const path = body.path;

    if (!path || typeof path !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid path' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('TMDB_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'TMDB_API_KEY not configured. Please add your TMDB API key in settings.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const separator = path.includes('?') ? '&' : '?';
    const url = `${TMDB_BASE_URL}${path}${separator}api_key=${apiKey}`;

    const tmdbRes = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!tmdbRes.ok) {
      const errorText = await tmdbRes.text();
      return new Response(
        JSON.stringify({ error: `TMDB API error: ${tmdbRes.status}`, details: errorText }),
        {
          status: tmdbRes.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await tmdbRes.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});
