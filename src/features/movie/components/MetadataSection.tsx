import { Grid } from '@mui/material';
import { DetailItem } from './DetailItem';
import type { MovieDetail } from '../../../types/api';

type MetadataSectionProps = {
  movie: MovieDetail;
};

export const MetadataSection = ({ movie }: MetadataSectionProps) => (
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
