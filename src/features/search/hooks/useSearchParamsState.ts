import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type Params = {
  query: string;
  page: number;
};
type UseSearchParamsStateReturn = {
  params: Params;
  setSearchParams: (params: Params) => void;
  handlePageChange: (newPage: number) => void;
};

export const useSearchParamsState = (): UseSearchParamsStateReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get and validate query params
  const query = useMemo(() => searchParams.get('q')?.trim() || '', [searchParams]);
  const page = useMemo(() => {
    const pageParam = searchParams.get('page');
    return Math.max(1, parseInt(pageParam || '1', 10) || 1);
  }, [searchParams]);

  const updateSearchParams = useCallback(
    ({ query, page }: Params) => {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      params.set('page', page.toString());
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1) return;
      updateSearchParams({ query, page: newPage });
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [query, updateSearchParams]
  );

  return {
    params: { query, page },
    setSearchParams: updateSearchParams,
    handlePageChange,
  };
};
