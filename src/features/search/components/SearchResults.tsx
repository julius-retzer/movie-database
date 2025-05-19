import { Grid, Typography, Card, CardContent, CardActions, Skeleton, Box, Button } from '@mui/material';
import { MoviePoster } from '../../../components/MoviePoster/MoviePoster';
import type { Movie } from '../../../types/api';
import { useNavigate } from 'react-router-dom';

type SearchResultsProps = {
  movies?: Movie[];
  loading: boolean;
  onMovieSelect: (imdbID: string) => void;
};

export const SearchResults = ({ movies, loading, onMovieSelect }: SearchResultsProps) => {

  const navigate = useNavigate();

  if (loading) {
    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[...Array(6)].map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Skeleton variant="rectangular" height={200} animation="wave" />
              <CardContent>
                <Skeleton width="60%" height={32} animation="wave" />
                <Skeleton width="40%" height={24} animation="wave" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }


  if (!movies) {
    return null;
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No movies found. Try a different search term.
        </Typography>
      </Box>
    );
  }
console.log(movies);

  return (
    <Grid container spacing={3}  sx={{ mt: 2 }}>
      {movies.map((movie) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.imdbID}>
          <Card sx={{ height: '100%' }}>
            <MoviePoster movie={movie} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" noWrap>
                {movie.Title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {movie.Year} • {movie.Type}
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto', p: 2 }}>
              <Button size="small" onClick={() => onMovieSelect(movie.imdbID)}>
                View Details
              </Button>
              <Button size="small" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
