import { Box, Typography, Stack, Paper } from '@mui/material';

type RatingsSectionProps = {
  ratings: Array<{ Source: string; Value: string }>;
};

export const RatingsSection = ({ ratings }: RatingsSectionProps) => (
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
