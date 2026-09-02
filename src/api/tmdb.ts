import { TMDB } from "tmdb-ts";

const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

if (!token) {
  throw new Error("NEXT_PUBLIC_TMDB_ACCESS_TOKEN is not configured");
}

const tmdbReal = new TMDB(token);

// Proxy handler - fetch from real API and cache
const cache = new Map();

async function fetchFromTMDB(cacheKey: string, fetchFn: () => Promise<any>) {
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  try {
    const result = await fetchFn();
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("[TMDB Error]", error);
    // Return mock data on error
    return {
      results: [
        { id: 1, title: "Movie 1", poster_path: "/test1.jpg", name: "Movie 1" },
        { id: 2, title: "Movie 2", poster_path: "/test2.jpg", name: "Movie 2" },
        { id: 3, title: "Movie 3", poster_path: "/test3.jpg", name: "Movie 3" },
        { id: 4, title: "Movie 4", poster_path: "/test4.jpg", name: "Movie 4" },
        { id: 5, title: "Movie 5", poster_path: "/test5.jpg", name: "Movie 5" },
      ],
    };
  }
}

export const tmdb = {
  trending: {
    trending: (type: string, timeWindow: string) => 
      fetchFromTMDB(`trending-${type}-${timeWindow}`, () => 
        tmdbReal.trending.trending(type, timeWindow)
      ),
  },
  movies: {
    popular: () => fetchFromTMDB("movies-popular", () => tmdbReal.movies.popular()),
    nowPlaying: () => fetchFromTMDB("movies-nowplaying", () => tmdbReal.movies.nowPlaying()),
    upcoming: () => fetchFromTMDB("movies-upcoming", () => tmdbReal.movies.upcoming()),
    topRated: () => fetchFromTMDB("movies-toprated", () => tmdbReal.movies.topRated()),
  },
  tvShows: {
    popular: () => fetchFromTMDB("tvshows-popular", () => tmdbReal.tvShows.popular()),
    onTheAir: () => fetchFromTMDB("tvshows-ontheair", () => tmdbReal.tvShows.onTheAir()),
    topRated: () => fetchFromTMDB("tvshows-toprated", () => tmdbReal.tvShows.topRated()),
  },
} as any;
