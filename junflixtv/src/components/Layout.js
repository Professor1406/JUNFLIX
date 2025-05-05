import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: '0 10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

export default function Layout({ children }) {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#141414' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Typography component="a" sx={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
                JUNFLIXTV
              </Typography>
            </Link>
          </Typography>
          <NavButton component={Link} href="/movies">Movies</NavButton>
          <NavButton component={Link} href="/tv-shows">TV Shows</NavButton>
          <NavButton component={Link} href="/anime">Anime</NavButton>
          <NavButton component={Link} href="/pinoy-movies">Pinoy Movies</NavButton>
          <NavButton component={Link} href="/korean-drama">Korean Drama</NavButton>
        </Toolbar>
      </StyledAppBar>
      <Box component="main" sx={{ pt: 8 }}>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </Box>
  );
} 