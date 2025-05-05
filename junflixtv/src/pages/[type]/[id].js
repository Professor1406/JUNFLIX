import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Layout from '../../components/Layout';
import Player from '../../components/Player';
import { getMovieDetails, getTVShowDetails } from '../../services/tmdb';

export default function MediaPage({ type, id }) {
  const [mediaDetails, setMediaDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = type === 'movie'
          ? await getMovieDetails(id)
          : await getTVShowDetails(id);
        setMediaDetails(details);
      } catch (error) {
        console.error('Error fetching media details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ mt: 4 }}>
        <Player type={type} id={id} />
        <Paper sx={{ p: 3, mt: 2, backgroundColor: '#1a1a1a' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
            {mediaDetails?.title || mediaDetails?.name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {mediaDetails?.overview}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                Release Date: {mediaDetails?.release_date || mediaDetails?.first_air_date}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                Rating: {mediaDetails?.vote_average?.toFixed(1)}/10
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
} 