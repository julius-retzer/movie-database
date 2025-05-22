import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  Chip,
  Divider,
 Grid,
} from '@mui/material';
import { getMovieById } from '../../api/omdb';
import { isApiError } from '../../types/api';
import { FavoriteButton } from '../../components/FavoriteButton';
import { MoviePoster } from '../../components/MoviePoster/MoviePoster';
import type { MovieDetail } from '../../types/api';

// Types
type MovieHeaderProps = {
  movie: MovieDetail;
};

type GenreListProps = {
  genres: string;
};

type DetailItemProps = {
  label: string;
  value?: string;
};

type MetadataSectionProps = {
  movie: MovieDetail;
};

type RatingsSectionProps = {
  ratings: Array<{ Source: string; Value: string }>;
};

type PlotSectionProps = {
  plot: string;
};

type MovieContentProps = {
  movie: MovieDetail;
};

type PosterSectionProps = {
  movie: MovieDetail;
};

// Main Component
export const MovieDetailPage = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const movieId = paramId || '';

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !!movieId,
  });

  if (isLoading) return <LoadingState />;
  if (error) {
    const errorMessage = isApiError(error) ? error.Error : 'Failed to load movie details';
    return <ErrorState message={errorMessage} />;
  }
  if (!movie) return <NoDataState />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={4}>
          <PosterSection movie={movie} />
          <MovieContent movie={movie} />
        </Box>
      </Paper>
    </Container>
  );
};

// UI Components
const PosterSection = ({ movie }: PosterSectionProps) => (
  <Box
    flexShrink={0}
    sx={{ width: { xs: '100%', sm: '300px' }, mx: 'auto', position: 'relative' }}
  >
    <MoviePoster movie={movie} height={450} />
  </Box>
);

const MovieContent = ({ movie }: MovieContentProps) => (
  <Box flexGrow={1}>
    <MovieHeader movie={movie} />
    {movie.Genre && <GenreList genres={movie.Genre} />}
    {movie.Plot && <PlotSection plot={movie.Plot} />}
    <Divider sx={{ my: 2 }} />
    <MetadataSection movie={movie} />
    {movie.Ratings?.length > 0 && <RatingsSection ratings={movie.Ratings} />}
  </Box>
);

const PlotSection = ({ plot }: PlotSectionProps) => (
  <Box mb={3}>
    <Typography variant="body1">{plot}</Typography>
  </Box>
);

const MovieHeader = ({ movie }: MovieHeaderProps) => (
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
);

const GenreList = ({ genres }: GenreListProps) => (
  <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" gap={1}>
    {genres.split(', ').map((genre) => (
      <Chip key={genre} label={genre} size="small" />
    ))}
  </Stack>
);

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

const MetadataSection = ({ movie }: MetadataSectionProps) => (
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
);

const RatingsSection = ({ ratings }: RatingsSectionProps) => (
  <Box mt={3}>
    <Typography variant="h6" gutterBottom>
      Ratings
    </Typography>
    <Stack direction="row" flexWrap="wrap" gap={2}>
      {ratings.map((rating) => (
        <Paper key={rating.Source} variant="outlined" sx={{ p: 1.5, minWidth: '120px' }}>
          <Typography variant="subtitle2" color="text.secondary">
            {rating.Source}
          </Typography>
          <Typography variant="h6">{rating.Value}</Typography>
        </Paper>
      ))}
    </Stack>
  </Box>
);

// Status Components
const LoadingState = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
    <CircularProgress />
  </Box>
);

const ErrorState = ({ message }: { message: string }) => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Alert severity="error">{message}</Alert>
  </Container>
);

const NoDataState = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Alert severity="info">No movie data available</Alert>
  </Container>
);
