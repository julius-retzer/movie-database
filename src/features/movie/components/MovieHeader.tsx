import { Typography, Chip, Stack } from '@mui/material';
import { FavoriteButton } from '../../favorites/components/FavoriteButton';
import type { MovieDetail } from '../../../types/api';

type MovieHeaderProps = {
  movie: MovieDetail;
};

export const MovieHeader = ({ movie }: MovieHeaderProps) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    alignItems="center"
    mb={2}
    gap={2}
    justifyContent="space-between"
  >
    <Stack direction="row" alignItems="center" gap={1}>
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
    </Stack>
    <Stack direction="row" alignItems="center" gap={2}>
      <Chip label={movie.Year} color="primary" variant="outlined" size="small" />
      {movie.Rated && movie.Rated !== 'N/A' && (
        <Chip label={movie.Rated} color="secondary" variant="outlined" size="small" />
      )}
    </Stack>
  </Stack>
);
