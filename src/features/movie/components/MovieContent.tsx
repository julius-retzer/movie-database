import { Box, Divider } from '@mui/material';
import { MovieHeader } from './MovieHeader';
import { GenreList } from './GenreList';
import { PlotSection } from './PlotSection';
import { MetadataSection } from './MetadataSection';
import { RatingsSection } from './RatingsSection';
import type { MovieDetail } from '../../../types/api';

type MovieContentProps = {
  movie: MovieDetail;
};

export const MovieContent = ({ movie }: MovieContentProps) => (
  <Box flexGrow={1}>
    <MovieHeader movie={movie} />
    {movie.Genre && <GenreList genres={movie.Genre} />}
    {movie.Plot && <PlotSection plot={movie.Plot} />}
    <Divider sx={{ my: 2 }} />
    <MetadataSection movie={movie} />
    {movie.Ratings?.length > 0 && <RatingsSection ratings={movie.Ratings} />}
  </Box>
);
