import { Box, Typography } from '@mui/material';

type DetailItemProps = {
  label: string;
  value?: string;
};

export const DetailItem = ({ label, value }: DetailItemProps) => {
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
