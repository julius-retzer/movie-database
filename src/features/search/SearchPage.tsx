import { useCallback, useMemo } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies, isApiError } from '../../api/omdb';
import type { Movie } from '../../types/api';
import { SearchInput } from './components/SearchInput';
import { SearchResults } from './components/SearchResults';
import { SearchPagination } from './components/SearchPagination';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 100; // OMDb API limitation

export const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get and validate query params
  const query = searchParams.get('q')?.trim() || '';
  const pageParam = searchParams.get('page');
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);

  // Fetch movies data
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query,
  });

  // Handle search query changes
  const handleSearch = useCallback(
    (searchQuery: string) => {
      const params = new URLSearchParams();
      const trimmedQuery = searchQuery.trim();

      if (trimmedQuery) {
        params.set('q', trimmedQuery);
        // Only reset page if it's a new search
        if (trimmedQuery !== query) {
          params.set('page', '1');
        } else {
          params.set('page', page.toString());
        }
      }
      setSearchParams(params);
    },
    [query, page, setSearchParams]
  );

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

  // Handle movie selection
  const handleMovieSelect = useCallback((imdbID: string) => {
    navigate(`/movie/${imdbID}`, { state: { fromSearch: true } });
  }, [navigate]);

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

      <SearchInput
        onSearch={handleSearch}
        initialValue={query}
        placeholder="Search for movies by title..."
      />

      {isError && errorMessage && (
        <Box mb={4}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {errorMessage}
          </Alert>
        </Box>
      )}

      <SearchResults
        movies={(data?.Search || []) as Movie[]}
        loading={isLoading}
        onMovieSelect={handleMovieSelect}
      />

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
