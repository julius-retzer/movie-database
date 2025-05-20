import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import { getMovieById } from '../../api/omdb';
import { isApiError } from '../../types/api';
import { FavoriteButton } from '../../components/FavoriteButton';
import { MoviePoster } from '../../components/MoviePoster/MoviePoster';

type MovieDetailPageProps = {
  id?: string;
};

export const MovieDetailPage = ({ id: propId }: MovieDetailPageProps) => {
  const { id: paramId } = useParams<{ id: string }>();
  const movieId = propId || paramId || '';

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !!movieId,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    const errorMessage = isApiError(error) ? error.Error : 'Failed to load movie details';
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{errorMessage}</Alert>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">No movie data available</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4}>
          <Box
            flexShrink={0}
            sx={{ width: { xs: '100%', sm: '300px' }, mx: 'auto', position: 'relative' }}
          >
            <MoviePoster movie={movie} height={450} />
          </Box>

          <Box flexGrow={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
              flexWrap="wrap"
              gap={2}
            >
              <Typography variant="h3" component="h1">
                {movie.Title}
              </Typography>
              <FavoriteButton
                movie={{
                  Title: movie.Title,
                  Year: movie.Year,
                  imdbID: movie.imdbID,
                  Type: movie.Type,
                  Poster: movie.Poster,
                }}
                size="large"
              />
              <Chip label={movie.Year} color="primary" variant="outlined" size="small" />
              {movie.Rated && movie.Rated !== 'N/A' && (
                <Chip label={movie.Rated} color="secondary" variant="outlined" size="small" />
              )}
            </Box>

            <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" gap={1}>
              {movie.Genre?.split(', ').map((genre) => (
                <Chip key={genre} label={genre} size="small" />
              ))}
            </Stack>

            <Box mb={3}>
              <Typography variant="body1">{movie.Plot}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid size={6}>
                <DetailItem label="Director" value={movie.Director} />
                <DetailItem label="Writers" value={movie.Writer} />
                <DetailItem label="Stars" value={movie.Actors} />
              </Grid>
              <Grid size={6}>
                <DetailItem label="Released" value={movie.Released} />
                <DetailItem label="Runtime" value={movie.Runtime} />
                <DetailItem label="Country" value={movie.Country} />
                <DetailItem label="Language" value={movie.Language} />
              </Grid>
            </Grid>

            {movie.Ratings?.length > 0 && (
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Ratings
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={2}>
                  {movie.Ratings.map((rating) => (
                    <Paper
                      key={rating.Source}
                      variant="outlined"
                      sx={{ p: 1.5, minWidth: '120px' }}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        {rating.Source}
                      </Typography>
                      <Typography variant="h6">{rating.Value}</Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

type DetailItemProps = {
  label: string;
  value?: string;
};

const DetailItem = ({ label, value }: DetailItemProps) => {
  if (!value || value === 'N/A') return null;

  return (
    <Box mb={1.5}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};
