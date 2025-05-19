import type { MovieSearchResponse,  MovieDetailResponse, ApiError } from '../types/api';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

if (!API_KEY) {
  console.warn('OMDb API key is not set. Please set VITE_OMDB_API_KEY in your .env file.');
}

async function fetchApi<T>(params: Record<string, string>): Promise<T> {
  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    ...params,
  });

  const url = `https://www.omdbapi.com/?${searchParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      const error = new Error(data.Error || 'Unknown error occurred') as ApiError;
      error.Response = 'False';
      error.Error = data.Error;
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const searchMovies = async (
  query: string,
  page: number = 1,
  year?: string
): Promise<MovieSearchResponse> => {
  const params: Record<string, string> = {
    s: query,
    page: page.toString(),
    type: 'movie',
  };

  if (year) {
    params.y = year;
  }

  return fetchApi<MovieSearchResponse>(params);
};

export const getMovieById = async (id: string): Promise<MovieDetailResponse> => {
  return fetchApi<MovieDetailResponse>({
    i: id,
    plot: 'full',
  });
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof Error && 'message' in error;
};
