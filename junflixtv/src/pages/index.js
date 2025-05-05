import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Layout from '../components/Layout';
import { getTrendingMovies, getTrendingTVShows } from '../services/tmdb';
import MediaCard from '../components/MediaCard';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getTrendingMovies();
      const tvShows = await getTrendingTVShows();
      setTrendingMovies(movies);
      setTrendingTVShows(tvShows);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
          Trending Movies
        </Typography>
        <Grid container spacing={2}>
          {trendingMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MediaCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                type="movie"
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" sx={{ mt: 4, mb: 2, color: 'white' }}>
          Trending TV Shows
        </Typography>
        <Grid container spacing={2}>
          {trendingTVShows.map((show) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
              <MediaCard
                id={show.id}
                title={show.name}
                posterPath={show.poster_path}
                type="tv"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
} 