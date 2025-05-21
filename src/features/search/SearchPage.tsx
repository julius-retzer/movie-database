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
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, isApiError } from '../../api/omdb';
import { SearchResults } from './components/SearchResults';
import { SearchPagination } from './components/SearchPagination';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

const searchSchema = z.object({
  query: z
    .string()
    .min(3, 'Search query must be at least 3 characters long')
    .max(100, 'Query is too long'),
});

type SearchFormData = z.infer<typeof searchSchema>;

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 100; // OMDb API limitation

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get and validate query params
  const query = searchParams.get('q')?.trim() || '';
  const pageParam = searchParams.get('page');
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query,
    },
  });

  const queryValue = watch('query');

  // Update form value when URL query changes
  React.useEffect(() => {
    setValue('query', query);
  }, [query, setValue]);

  // Fetch movies data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.length > 2,
  });

  // Handle search form submission
  const onSubmit = useCallback(
    (data: SearchFormData) => {
      const trimmedQuery = data.query.trim();
      if (!trimmedQuery) return;

      const params = new URLSearchParams();
      params.set('q', trimmedQuery);
      // Only reset page if it's a new search
      params.set('page', trimmedQuery !== query ? '1' : page.toString());
      setSearchParams(params);
    },
    [query, page, setSearchParams]
  );

  const handleSearch = useCallback(() => {
    handleSubmit((data) => {
      const trimmedQuery = data.query.trim();
      if (!trimmedQuery) return;

      const params = new URLSearchParams();
      params.set('q', trimmedQuery);
      params.set('page', trimmedQuery !== query ? '1' : page.toString());
      setSearchParams(params);
    })();
  }, [handleSubmit, query, page, setSearchParams]);

  // Handle page changes
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > MAX_PAGES) return;

      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      setSearchParams(params);

      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [searchParams, setSearchParams]
  );
  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!data?.totalResults) return 0;
    return Math.min(Math.ceil(parseInt(data.totalResults, 10) / ITEMS_PER_PAGE), MAX_PAGES);
  }, [data?.totalResults]);

  // Show error message
  const errorMessage = useMemo(() => {
    if (!isError) return null;

    if (isApiError(error)) {
      return error.message;
    }

    return 'Failed to fetch movies. Please try again later.';
  }, [isError, error]);

  return (
    <Container maxWidth="lg" fixed sx={{ py: 4, height: '100vh' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Movie Search
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for movies by title..."
            value={queryValue}
            onChange={(e) => setValue('query', e.target.value)}
            error={!!errorMessage}
            helperText={errorMessage}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: queryValue && (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setValue('query', '')}
                      size="small"
                      aria-label="clear search"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
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
            sx={{ width: 200 }}
            loading={isLoading}
            type="submit"
          >
            Search
          </Button>
        </Box>
      </Box>

      {isError && errorMessage && (
        <Box mb={4}>
          <Alert severity="error">{errorMessage}</Alert>
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
