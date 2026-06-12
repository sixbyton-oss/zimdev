import React, { useEffect, useState } from 'react';
import { Loader2, Mail, Phone } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';
import {
  getTrending,
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  discoverMovies,
  discoverTVShows,
} from '@/lib/tmdb-client';
import type { TMDBMovie, TMDBTVShow } from '@/types/tmdb';

const Home: React.FC = () => {
  const [trending, setTrending] = useState<(TMDBMovie | TMDBTVShow)[]>([]);
  const [popularMovies, setPopularMovies] = useState<TMDBMovie[]>([]);
  const [popularTV, setPopularTV] = useState<TMDBTVShow[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<TMDBMovie[]>([]);
  const [animatedMovies, setAnimatedMovies] = useState<TMDBMovie[]>([]);
  const [localMovies, setLocalMovies] = useState<(TMDBMovie | TMDBTVShow)[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<TMDBMovie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<TMDBMovie[]>([]);
  const [heroItem, setHeroItem] = useState<TMDBMovie | TMDBTVShow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          trendingRes,
          popularRes,
          tvRes,
          topRatedRes,
          animatedRes,
          horrorRes,
          comedyRes,
          saMoviesRes,
          saTvRes,
          zwMoviesRes,
          zwTvRes,
          ngMoviesRes,
          ngTvRes,
        ] = await Promise.all([
          getTrending('all', 'week'),
          getPopularMovies(),
          getPopularTVShows(),
          getTopRatedMovies(),
          discoverMovies({ with_genres: '16', sort_by: 'popularity.desc' }),
          discoverMovies({ with_genres: '27', sort_by: 'popularity.desc' }),
          discoverMovies({ with_genres: '35', sort_by: 'popularity.desc' }),
          discoverMovies({ with_origin_country: 'ZA', sort_by: 'popularity.desc' }),
          discoverTVShows({ with_origin_country: 'ZA', sort_by: 'popularity.desc' }),
          discoverMovies({ with_origin_country: 'ZW', sort_by: 'popularity.desc' }),
          discoverTVShows({ with_origin_country: 'ZW', sort_by: 'popularity.desc' }),
          discoverMovies({ with_origin_country: 'NG', sort_by: 'popularity.desc' }),
          discoverTVShows({ with_origin_country: 'NG', sort_by: 'popularity.desc' }),
        ]);

        setTrending(trendingRes.results.slice(0, 16));
        setPopularMovies(popularRes.results.slice(0, 16));
        setPopularTV(tvRes.results.slice(0, 16));
        setTopRatedMovies(topRatedRes.results.slice(0, 16));
        setAnimatedMovies(animatedRes.results.slice(0, 16));
        setHorrorMovies(horrorRes.results.slice(0, 16));
        setComedyMovies(comedyRes.results.slice(0, 16));

        // Mix local content from ZA, ZW, NG
        const local = [
          ...saMoviesRes.results.slice(0, 6),
          ...saTvRes.results.slice(0, 4),
          ...zwMoviesRes.results.slice(0, 3),
          ...zwTvRes.results.slice(0, 2),
          ...ngMoviesRes.results.slice(0, 6),
          ...ngTvRes.results.slice(0, 4),
        ];
        // Shuffle local results
        for (let i = local.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [local[i], local[j]] = [local[j], local[i]];
        }
        setLocalMovies(local.slice(0, 16));

        // Set hero from first trending movie with a backdrop
        const hero = trendingRes.results.find(
          (item): item is TMDBMovie | TMDBTVShow =>
            'backdrop_path' in item && item.backdrop_path !== null
        );
        if (hero) setHeroItem(hero);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cycle hero banner through trending items every 10 seconds
  useEffect(() => {
    if (trending.length === 0) return;
    const interval = setInterval(() => {
      setHeroItem((prev) => {
        const candidates = trending.filter((t) => t.backdrop_path);
        if (candidates.length <= 1) return prev;
        let next;
        do {
          next = candidates[Math.floor(Math.random() * candidates.length)];
        } while (next && prev && next.id === prev.id);
        return next || prev;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [trending]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-destructive text-base mb-2">{error}</p>
        <p className="text-sm text-muted-foreground text-center">
          Please make sure your TMDB API key is configured correctly.
        </p>
      </div>
    );
  }

  const heroType = heroItem && 'title' in heroItem ? 'movie' : 'tv';

  return (
    <div className="animate-fade-in">
      {/* Logo hero - full width with slow rotation */}
      <div
        className="w-full flex items-center justify-center py-8 px-4"
        style={{ minHeight: '220px' }}
      >
        <img
          src="/hero-logo.jpg"
          alt="Byton TV"
          className="w-full max-w-3xl object-contain rounded-xl"
          style={{ animation: 'spin-slow 20s linear infinite' }}
        />
      </div>
      {heroItem && <HeroBanner item={heroItem} type={heroType} />}
      <div className="relative z-10 -mt-8 md:-mt-16">
        <MovieRow title="Trending Now" items={trending} type="movie" />
        <MovieRow title="Popular Movies" items={popularMovies} type="movie" />
        <MovieRow title="Cartoons" items={animatedMovies} type="movie" />
        <MovieRow title="Popular Series" items={popularTV} type="tv" />
        <MovieRow title="Local Movies" items={localMovies} type="movie" />
        <MovieRow title="Horror" items={horrorMovies} type="movie" />
        <MovieRow title="Comedy" items={comedyMovies} type="movie" />
        <MovieRow title="Top Rated Movies" items={topRatedMovies} type="movie" />

        {/* BYTON Analytics Card */}
        <div className="mt-8 mb-4 px-4 md:px-8 flex justify-center">
          <div className="group relative flex w-80 flex-col rounded-xl bg-card p-5 border border-border shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-10 blur-sm pointer-events-none transition-opacity duration-300 group-hover:opacity-20" />

            {/* Header */}
            <div className="relative flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">BYTON Analytics</span>
              </div>
              <span className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium" style={{ backgroundColor: 'hsl(142 76% 36% / 0.1)', color: 'hsl(142 76% 36%)' }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'hsl(142 76% 36%)' }} />
                Live
              </span>
            </div>

            {/* Stats */}
            <div className="relative grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Total Visitors</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-foreground">1.7K</p>
                  <span className="text-xs" style={{ color: 'hsl(142 76% 36%)' }}>+12.3%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">People Watched</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-foreground">974</p>
                  <span className="text-xs" style={{ color: 'hsl(142 76% 36%)' }}>+8.1%</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="relative mb-4 flex h-20 items-end gap-1 rounded-lg bg-muted/50 p-2">
              {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-primary transition-all duration-300" style={{ height: `${h}%` }} />
              ))}
            </div>

            {/* Footer */}
            <div className="relative flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Last 7 days</span>
              <a href="/movies" className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Start Watching
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-16 pt-10 pb-8 border-t border-border">
        <div className="flex flex-col items-center gap-4 px-4 text-center">
          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a
              href="mailto:help@zimdev.online"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              help@zimdev.online
            </a>
            <a
              href="https://wa.me/263786443311"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" />
              +263 786 443 311
            </a>
          </div>

          {/* Glowing caption */}
          <a
            href="https://wa.me/263786443311"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-caption text-sm font-medium text-primary mt-2"
          >
            This website was created by ZimDev
          </a>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground mt-2">
            2026&reg; | ZimDev Production
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
