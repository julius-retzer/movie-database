import { Stack, Chip } from '@mui/material';

type GenreListProps = {
  genres: string;
};

export const GenreList = ({ genres }: GenreListProps) => (
  <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" gap={1}>
    {genres.split(', ').map((genre) => (
      <Chip key={genre} label={genre} size="small" />
    ))}
  </Stack>
);
