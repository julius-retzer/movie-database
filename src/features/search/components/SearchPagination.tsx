import { Box, Pagination, Typography } from '@mui/material';

type SearchPaginationProps = {
  page: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export const SearchPagination = ({
  page,
  totalResults,
  itemsPerPage,
  onPageChange,
}: SearchPaginationProps) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startItem = Math.min((page - 1) * itemsPerPage + 1, totalResults);
  const endItem = Math.min(page * itemsPerPage, totalResults);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        gap: 2,
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        size="large"
      />
      <Typography variant="body2" color="text.secondary">
        Showing {startItem}-{endItem} of {totalResults} results
      </Typography>
    </Box>
  );
};
