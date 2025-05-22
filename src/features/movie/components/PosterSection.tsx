import { Box } from '@mui/material';
import { MoviePoster } from '../../../components/MoviePoster/MoviePoster';
import type { MovieDetail } from '../../../types/api';

type PosterSectionProps = {
  movie: MovieDetail;
};

export const PosterSection = ({ movie }: PosterSectionProps) => (
  <Box flexShrink={0} sx={{ width: { xs: '100%', sm: '300px' }, mx: 'auto', position: 'relative' }}>
    <MoviePoster movie={movie} height={450} />
  </Box>
);
