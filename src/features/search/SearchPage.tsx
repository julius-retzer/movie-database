import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Stack,
} from '@mui/material';
import { SearchResults } from './components/SearchResults';
import { SearchPagination } from './components/SearchPagination';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useSearchParamsState } from './hooks/useSearchParamsState';
import { useMovieSearch } from './hooks/useMovieSearch';
import { isApiError } from '../../types/api';

const MIN_CHARACTERS = 3;
const MAX_CHARACTERS = 100;

const searchSchema = z.object({
  query: z
    .string()
    .min(MIN_CHARACTERS, `Search query must be at least ${MIN_CHARACTERS} characters long`)
    .max(MAX_CHARACTERS, `Query is too long`),
});

type SearchFormData = z.infer<typeof searchSchema>;

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 100;

export const SearchPage = () => {
  const { params, setSearchParams, handlePageChange } = useSearchParamsState();
  const { query, page } = params;

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors: validationErrors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query,
    },
  });

  const queryValue = watch('query');

  // Fetch movies data using custom hook
  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useMovieSearch({
    query,
    page,
    minCharacters: MIN_CHARACTERS,
  });

  // Handle search form submission
  const onSubmit = handleSubmit((data) => {
    // Only reset page if it's a new search
    const newPage = data.query !== query ? 1 : page;
    setSearchParams({ query: data.query, page: newPage });
  });
  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!data?.totalResults) return 0;
    return Math.min(Math.ceil(parseInt(data.totalResults, 10) / ITEMS_PER_PAGE), MAX_PAGES);
  }, [data?.totalResults]);

  // Show error message
  const apiErrorMessage = useMemo(() => {
    if (!isError) return null;

    if (isApiError(apiError)) {
      return apiError.message;
    }

    return 'Failed to fetch movies. Please try again later.';
  }, [isError, apiError]);

  return (
    <Container maxWidth="lg" fixed sx={{ py: 4, height: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Movie Search
      </Typography>

      <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
        <Box sx={{ minHeight: 80, width: '100%' }}>
          <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for movies by title..."
              error={!!validationErrors.query}
              helperText={validationErrors.query?.message}
              {...register('query')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: queryValue && (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setSearchParams({ query: '', page: 1 });
                        reset({query: ''});
                      }}
                      size="small"
                      aria-label="clear search"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              disabled={!queryValue.trim()}
              startIcon={<SearchIcon />}
              sx={{ width: 200, height: 56 }}
              loading={isLoading}
              type="submit"
            >
              Search
            </Button>
          </Stack>
        </Box>
      </Box>

      {isError && apiErrorMessage && (
        <Box mb={4}>
          <Alert severity="error">{apiErrorMessage}</Alert>
        </Box>
      )}

      <SearchResults movies={data?.Search} loading={isLoading} />

      {totalPages > 1 && (
        <SearchPagination
          page={Math.min(page, totalPages)}
          totalResults={parseInt(data?.totalResults || '0', 10)}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};
