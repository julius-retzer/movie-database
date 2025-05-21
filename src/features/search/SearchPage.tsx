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
import { useQuery } from '@tanstack/react-query';
import { searchMovies, isApiError } from '../../api/omdb';
import { SearchResults } from './components/SearchResults';
import { SearchPagination } from './components/SearchPagination';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useSearchParamsState } from './hooks/useSearchParamsState';

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
const MAX_PAGES = 100; // OMDb API limitation

export const SearchPage = () => {
  const { query, page, setSearchParams, handlePageChange } = useSearchParamsState();

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
    mode: 'onChange',
  });

  const queryValue = watch('query');

  // Fetch movies data
  const {
    data,
    isLoading,
    isError,
    error: apiError,
  } = useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.length >= MIN_CHARACTERS,
  });

  // Handle search form submission
  const onSubmit = useCallback(
    (data: SearchFormData) => {
      const trimmedQuery = data.query.trim();
      if (!trimmedQuery) return;

      // Only reset page if it's a new search
      const newPage = trimmedQuery !== query ? 1 : page;
      setSearchParams({ query: trimmedQuery, page: newPage });
    },
    [query, page, setSearchParams]
  );
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

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
        <Box sx={{ minHeight: 80, width: '100%' }}>
          <Stack  direction="row" spacing={2} sx={{width: '100%' }}>
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
                      onClick={() => reset()}
                      size="small"
                      aria-label="clear search"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                },
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
