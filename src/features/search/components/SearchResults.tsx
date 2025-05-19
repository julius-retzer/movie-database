import { Grid, Typography, Card, CardContent, CardActions, Skeleton, Box, Button, Stack } from '@mui/material';
import { MoviePoster } from '../../../components/MoviePoster/MoviePoster';
import type { Movie } from '../../../types/api';
import { useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../../../components/FavoriteButton';

type SearchResultsProps = {
  movies?: Movie[];
  loading: boolean;
};

export const SearchResults = ({ movies, loading }: SearchResultsProps) => {

  const navigate = useNavigate();

  if (loading) {
    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[...Array(6)].map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Skeleton
                variant="rectangular"
                height={400}
                animation="wave"
              />
              <CardContent>
                <Skeleton
                  width="80%"
                  height={32}
                  animation="wave"
                  sx={{  mb: 1.5 }}
                />
                <Skeleton
                  width="40%"
                  height={24}
                  animation="wave"

                />
              </CardContent>
              <CardActions sx={{ mt: 'auto', p: 2}}>
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={36}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={36}
                  animation="wave"
                />
              </CardActions>
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
            <CardActions sx={{ mt: 'auto', p: 2, justifyContent: 'space-between' }}>
              <Button
                size="small"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/movie/${movie.imdbID}`);
                }}
              >
                View Details
              </Button>
              <FavoriteButton movie={movie} size="small" />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
