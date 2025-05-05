import axios from 'axios';

const TMDB_API_KEY = '648c004c97b5a1425c702528ab88ddac';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getTrendingMovies = async () => {
  const response = await tmdbApi.get('/trending/movie/week');
  return response.data.results;
};

export const getTrendingTVShows = async () => {
  const response = await tmdbApi.get('/trending/tv/week');
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getTVShowDetails = async (tvId) => {
  const response = await tmdbApi.get(`/tv/${tvId}`);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const searchTVShows = async (query) => {
  const response = await tmdbApi.get('/search/tv', {
    params: { query },
  });
  return response.data.results;
}; 