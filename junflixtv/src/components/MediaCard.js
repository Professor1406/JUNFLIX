import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function MediaCard({ id, title, posterPath, type }) {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/placeholder.jpg';

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1a1a1a' }}>
      <CardActionArea component={Link} href={`/${type}/${id}`}>
        <CardMedia sx={{ height: 500, position: 'relative' }}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 345px) 100vw, 345px"
          />
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: 'white', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
} 