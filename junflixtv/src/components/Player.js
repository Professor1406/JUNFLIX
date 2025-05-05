import { Box, Typography, CircularProgress } from '@mui/material';
import ReactPlayer from 'react-player';
import { getBestStreamingSource } from '../services/streaming';

export default function Player({ type, id }) {
  const [streamUrl, setStreamUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const source = getBestStreamingSource(type);
        const url = `${source.url}${id}`;
        setStreamUrl(url);
      } catch (err) {
        setError('Failed to load streaming source');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreamUrl();
  }, [type, id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <ReactPlayer
        url={streamUrl}
        width="100%"
        height="100%"
        controls
        playing
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />
    </Box>
  );
} 