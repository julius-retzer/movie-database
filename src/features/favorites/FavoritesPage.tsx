import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from './hooks/useFavorites';
import { MoviePoster } from '../../components/MoviePoster';

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
        <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
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
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box onClick={() => navigate(`/movie/${movie.imdbID}`)} sx={{ cursor: 'pointer' }}>
                <MoviePoster movie={movie} />
                <CardContent>
                  <Typography variant="h6" component="div" noWrap>
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {movie.Year} • {movie.Type}
                  </Typography>
                </CardContent>
              </Box>
              <CardActions sx={{ mt: 'auto', p: 2 }}>
                <Button
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(movie.imdbID);
                  }}
                  sx={{ ml: 'auto' }}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
