import { Box, Container, CircularProgress, Alert } from '@mui/material';

export const LoadingState = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
    <CircularProgress />
  </Box>
);

type ErrorStateProps = {
  message: string;
};

export const ErrorState = ({ message }: ErrorStateProps) => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Alert severity="error">{message}</Alert>
  </Container>
);

export const NoDataState = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Alert severity="info">No movie data available</Alert>
  </Container>
);
