import { Box, Typography } from '@mui/material';

type PlotSectionProps = {
  plot: string;
};

export const PlotSection = ({ plot }: PlotSectionProps) => (
  <Box mb={3}>
    <Typography variant="body1">{plot}</Typography>
  </Box>
);
