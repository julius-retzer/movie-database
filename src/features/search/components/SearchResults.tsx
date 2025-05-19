import { Grid, Typography, Card, CardContent, CardMedia, CardActionArea, Skeleton, Box } from '@mui/material';
import type { Movie } from '@/types/api';

type SearchResultsProps = {
  movies: Movie[];
  loading: boolean;
  onMovieSelect: (imdbID: string) => void;
};

export const SearchResults = ({ movies, loading, onMovieSelect }: SearchResultsProps) => {
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

  if (movies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No movies found. Try a different search term.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {movies.map((movie) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.imdbID}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={() => onMovieSelect(movie.imdbID)}>
              <CardMedia
                component="img"
                height="300"
                image={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                alt={movie.Title}
                sx={{
                  objectFit: 'cover',
                  bgcolor: 'background.paper',
                  aspectRatio: '2/3',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.Year} • {movie.Type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
