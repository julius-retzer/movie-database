import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Container, Paper, Stack } from '@mui/material';
import { getMovieById } from '../../api/omdb';
import { isApiError } from '../../types/api';

// Import components
import { PosterSection } from './components/PosterSection';
import { MovieContent } from './components/MovieContent';
import { LoadingState, ErrorState, NoDataState } from './components/StatusComponents';

export const MovieDetailPage = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const movieId = paramId || '';

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
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
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={4}>
          <PosterSection movie={movie} />
          <MovieContent movie={movie} />
        </Stack>
      </Paper>
    </Container>
  );
};
