// Mock TMDB API - Returns test data
const mockMovies = {
  results: [
    { id: 550, title: "Fight Club", poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", release_date: "1999-10-15", vote_average: 8.8 },
    { id: 278, title: "The Shawshank Redemption", poster_path: "/q6725aR8Zs4IwWvn0ja0O6f3KsP.jpg", release_date: "1994-09-23", vote_average: 9.3 },
    { id: 238, title: "The Godfather", poster_path: "/3bhkrj58Vtu7enYsRolD1fmnbvV.jpg", release_date: "1972-03-14", vote_average: 9.2 },
    { id: 240, title: "The Godfather Part II", poster_path: "/hWXwMwx0fHXNQoDu8BdXQWAFu1.jpg", release_date: "1974-12-20", vote_average: 9.0 },
    { id: 424, title: "Schindler's List", poster_path: "/sF1U4ZippQeaA8fp1csplash.jpg", release_date: "1993-12-15", vote_average: 8.9 },
    { id: 129, title: "Spirited Away", poster_path: "/39wmItQLFBRM3Ojedoch9sBXUScT.jpg", release_date: "2001-07-20", vote_average: 8.6 },
  ],
};

const mockTVShows = {
  results: [
    { id: 1399, name: "Breaking Bad", poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", first_air_date: "2008-01-20", vote_average: 9.5 },
    { id: 1668, name: "Friends", poster_path: "/f496cm9ePpsUWcEBC6FOq28FF0x.jpg", first_air_date: "1994-09-22", vote_average: 8.9 },
    { id: 1402, name: "The Office", poster_path: "/askg3SMvhqEl4OL52YuvjO3GXoH.jpg", first_air_date: "2005-03-24", vote_average: 9.0 },
    { id: 1404, name: "Game of Thrones", poster_path: "/u3bVoque7qBmNg10qoFY05gIO1.jpg", first_air_date: "2011-04-17", vote_average: 9.2 },
    { id: 1419, name: "The Crown", poster_path: "/rLa4vCJM9mM1Ej5BqRHYggrxZJ2.jpg", first_air_date: "2016-11-04", vote_average: 8.6 },
    { id: 2488, name: "Stranger Things", poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", first_air_date: "2016-07-15", vote_average: 8.7 },
  ],
};

// Immediately resolve promises for React Query
const resolvedMovies = Promise.resolve(mockMovies);
const resolvedTVShows = Promise.resolve(mockTVShows);

export const tmdb = {
  trending: {
    trending: () => resolvedMovies,
  },
  movies: {
    popular: () => resolvedMovies,
    nowPlaying: () => resolvedMovies,
    upcoming: () => resolvedMovies,
    topRated: () => resolvedMovies,
  },
  tvShows: {
    popular: () => resolvedTVShows,
    onTheAir: () => resolvedTVShows,
    topRated: () => resolvedTVShows,
  },
} as any;
