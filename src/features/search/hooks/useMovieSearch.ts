import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../../../api/omdb';

type UseMovieSearchProps = {
  query: string;
  page: number;
  minCharacters?: number;
};

export const useMovieSearch = ({ query, page, minCharacters = 3 }: UseMovieSearchProps) => {
  const queryInfo = useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.length >= minCharacters,
  });

  return queryInfo;
};
