import { Box, Typography, Container, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { MoviePoster } from '../../components/MoviePoster/MoviePoster';

export const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Favorites
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          You haven't added any movies to your favorites yet.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Browse Movies
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Favorites
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {favorites.map((movie) => (
          <Grid key={movie.imdbID} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Paper
              elevation={2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s',
                },
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            >
              <MoviePoster movie={movie} />
              <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="div" noWrap>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto', pt: 1 }}>
                  {movie.Year} • {movie.Type}
                </Typography>
              </Box>
              <Button
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(movie.imdbID);
                }}
                sx={{ m: 1, alignSelf: 'flex-start' }}
              >
                Remove
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
